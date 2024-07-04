/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { BaseModal } from "@/components/common/Modal";
import { DataTable } from "@/components/common/Table/DataTable";
import Typography from "@/components/common/Typography";
import IconDelete from "@/components/icons/IconDelete";
import IconEdit from "@/components/icons/IconEdit";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATH } from "@/constants/routes";
import { useLoader } from "@/hooks/useLoader";
import { postServices } from "@/services/posts.service";
import type { PostType } from "@/types/post";
import { formateDate } from "@/utils/date";
import { r } from "@/utils/route";
import { EPostStatus } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function BlogList() {
  const { toast } = useToast();
  const { showLoader } = useLoader();
  const [postList, setPostList] = useState<PostType[]>([]);

  const [removedId, setRemovedId] = useState<number>();
  const [openRemovedModal, setOpenRemovedModal] = useState<boolean>(false);

  const fetchPostList = async () => {
    try {
      showLoader(true);
      const response = await postServices.getAll();

      setPostList(response);
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra.",
        variant: "destructive",
      });
    } finally {
      showLoader(false);
    }
  };

  const handleRemovePost = async () => {
    try {
      if (!removedId) return;
      showLoader(true);

      await postServices.deleteById(removedId);

      toast({
        title: "Đã xoá bài viết thành công",
        variant: "destructive",
      });

      await fetchPostList();
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra.",
        variant: "destructive",
      });
    } finally {
      showLoader(false);
      setOpenRemovedModal(false);
    }
  };

  const handleChangeStatus = async (id: number, status: EPostStatus) => {
    try {
      if (!id) return;
      showLoader(true);

      await postServices.changeStatus(id, status);

      toast({
        title: "Đã cập nhật trạng thái bài viết thành công",
        variant: "destructive",
      });

      await fetchPostList();
    } catch (error) {
      toast({
        title: "Đã cập nhật trạng thái bài viết thất bại",
        variant: "destructive",
      });
    } finally {
      showLoader(false);
    }
  };

  const columns: ColumnDef<PostType>[] = useMemo(() => {
    return [
      {
        accessorKey: "title",
        header: "Tiêu đề",
        cell: ({ row }) => {
          return (
            <p className="max-w-[200px] break-words">{row.getValue("title")}</p>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Mô tả",
        cell: ({ row }) => {
          return (
            <p className="break-word max-w-[700px] font-medium">
              {row.getValue("description")}
            </p>
          );
        },
      },
      {
        accessorKey: "slug",
        header: "Slug",
        cell: ({ row }) => {
          return (
            <p className="max-w-[200px] break-words">{row.getValue("slug")}</p>
          );
        },
      },
      {
        accessorKey: "thumbnail",
        header: "Media",
        cell: ({ row }) => {
          return (
            <Image
              src={row.getValue("thumbnail")}
              width={100}
              height={100}
              objectFit="cover"
              className="rounded-[10px]"
              alt="thumbnail"
            />
          );
        },
      },
      {
        accessorKey: "categories",
        header: "Thể loại",
        cell: ({ row }) => {
          return (
            <div>
              {(row.getValue("categories") as any)
                ?.map((x: any) => x?.category?.name)
                ?.join(" , ")}
            </div>
          );
        },
      },
      {
        accessorKey: "priority",
        header: "Ưu tiên",
        cell: ({ row }) => {
          return <p>{row.getValue("priority")}</p>;
        },
      },
      {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
          return <p>{(row.getValue("tags") as string[])?.join(" , ")}</p>;
        },
      },
      {
        accessorKey: "publishAt",
        header: "Ngày đăng",
        cell: ({ row }) => {
          return (
            <p>
              {row.getValue("publishAt")
                ? formateDate(row.getValue("publishAt"))
                : ""}
            </p>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
          return (
            <Switch
              checked={row.getValue("status") === EPostStatus.Publish}
              value={row.getValue("status")}
              onCheckedChange={(state) =>
                handleChangeStatus(
                  row.original.id,
                  state ? EPostStatus.Publish : EPostStatus.Draft,
                )
              }
            />
          );
        },
      },
      {
        accessorKey: "id",
        header: "Thao tác",
        cell: ({ row }) => {
          const id = parseInt(row.getValue("id"));
          return (
            <div className="flex items-center gap-x-2">
              <Link
                href={r(ROUTE_PATH.ADMIN.POSTS.EDIT, {
                  id,
                })}
              >
                <Button className="p-1">
                  <IconEdit className="stroke-white" />
                </Button>
              </Link>
              <Button
                className="bg-red-500 p-1 hover:bg-red-200"
                onClick={() => {
                  setRemovedId(id);
                  setOpenRemovedModal(true);
                }}
              >
                <IconDelete className="stroke-white" />
              </Button>
            </div>
          );
        },
      },
    ];
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPostList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <Typography text="Quản lý bài viết" />

        <Link href={ROUTE_PATH.ADMIN.POSTS.CREATE}>
          <Button type="button">Thêm mới</Button>
        </Link>
      </div>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={postList}
          filter={{
            field: "title",
            placeholder: "Nhập tên bài viết ở đây",
          }}
        />
      </div>

      <BaseModal
        title="Xác nhận xoá"
        description="Ban có xác nhận muốn xoá bài viết này không ?"
        open={openRemovedModal}
        setOpen={setOpenRemovedModal}
        onOk={handleRemovePost}
      />
    </section>
  );
}
