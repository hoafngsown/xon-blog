/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { BaseModal } from "@/components/common/Modal";
import { DataTable } from "@/components/common/Table/DataTable";
import Typography from "@/components/common/Typography";
import IconDelete from "@/components/icons/IconDelete";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useLoader } from "@/hooks/useLoader";
import { commentServices } from "@/services/client/comments.service";
import type { CommentType } from "@/types/comment";
import { formatDate } from "@/utils/date";
import { ECommentStatus } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

export default function CommentListPage() {
  const { toast } = useToast();
  const { showLoader } = useLoader();
  const [commentList, setCommentList] = useState<CommentType[]>([]);

  const [removedId, setRemovedId] = useState<number>();
  const [openRemovedModal, setOpenRemovedModal] = useState<boolean>(false);

  const fetchCommentList = async () => {
    try {
      showLoader(true);
      const response = await commentServices.getAll();

      setCommentList(response);
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra.",
        variant: "destructive",
      });
    } finally {
      showLoader(false);
    }
  };

  const handleRemoveComment = async () => {
    try {
      if (!removedId) return;
      showLoader(true);

      await commentServices.deleteById(removedId);

      toast({
        title: "Đã xoá bài comment thành công",
        variant: "destructive",
      });

      await fetchCommentList();
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

  const handleChangeStatus = async (id: number, status: ECommentStatus) => {
    try {
      if (!id) return;
      showLoader(true);

      await commentServices.changeStatus(id, status);

      toast({
        title: "Đã cập nhật trạng thái comment thành công",
        variant: "destructive",
      });

      await fetchCommentList();
    } catch (error) {
      toast({
        title: "Đã cập nhật trạng thái comment thất bại",
        variant: "destructive",
      });
    } finally {
      showLoader(false);
    }
  };

  const columns: ColumnDef<CommentType>[] = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: "Tên người gửi",
        cell: ({ row }) => {
          return (
            <p className="max-w-[200px] break-words">{row.getValue("name")}</p>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
          return (
            <p className="max-w-[200px] break-words">{row.getValue("email")}</p>
          );
        },
      },
      {
        accessorKey: "content",
        header: "Nội dung",
        cell: ({ row }) => {
          return (
            <p className="break-word line-clamp-3 max-w-[600px] font-medium">
              {row.getValue("content")}
            </p>
          );
        },
      },
      {
        accessorKey: "website",
        header: "Website",
        cell: ({ row }) => {
          return (
            <p className="break-word line-clamp-3 max-w-[600px] font-medium">
              {row.getValue("website")}
            </p>
          );
        },
      },
      {
        accessorKey: "",
        header: "Bài viết",
        cell: ({ row }) => {
          const title = (row.original as any)?.post?.title ?? "";
          return <p>{title}</p>;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) => {
          return (
            <p>
              {row.getValue("createdAt")
                ? formatDate(row.getValue("createdAt"))
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
              checked={row.getValue("status") === ECommentStatus.Approved}
              value={row.getValue("status")}
              onCheckedChange={(state) =>
                handleChangeStatus(
                  row.original.id,
                  state ? ECommentStatus.Approved : ECommentStatus.NotApprove,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <Typography text="Quản lý comments" />
      </div>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={commentList}
          filter={{
            field: "name",
            placeholder: "Nhập tên người bình luận ở đây",
          }}
        />
      </div>

      <BaseModal
        title="Xác nhận xoá"
        description="Ban có xác nhận muốn xoá bình luận này không ?"
        open={openRemovedModal}
        setOpen={setOpenRemovedModal}
        onOk={handleRemoveComment}
      />
    </section>
  );
}
