"use client";

import { BaseModal } from "@/components/common/Modal";
import { DataTable } from "@/components/common/Table/DataTable";
import Typography from "@/components/common/Typography";
import IconDelete from "@/components/icons/IconDelete";
import IconEdit from "@/components/icons/IconEdit";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATH } from "@/constants/routes";
import { useLoader } from "@/hooks/useLoader";
import { categoryServices } from "@/services/client/categories.service";
import type { CategoryType } from "@/types/categories";
import { formateDate } from "@/utils/date";
import { r } from "@/utils/route";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function CategoryList() {
  const { toast } = useToast();
  const { showLoader } = useLoader();
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);

  const [removedId, setRemovedId] = useState<number>();
  const [openRemovedModal, setOpenRemovedModal] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      showLoader(true);
      const response = await categoryServices.getAll();

      setCategoryList(response);
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra.",
        variant: "destructive",
      });
    } finally {
      showLoader(false);
    }
  };

  const handleRemoveCategory = async () => {
    try {
      if (!removedId) return;
      showLoader(true);

      await categoryServices.deleteById(removedId);

      toast({
        title: "Đã xoá category thành công",
        variant: "destructive",
      });

      await fetchCategories();
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

  const columns: ColumnDef<CategoryType>[] = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          return (
            <p className="max-w-[200px] break-words">{row.getValue("name")}</p>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
          return (
            <p className="break-word max-w-[700px] text-right font-medium">
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
        header: "thumbnail",
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
        accessorKey: "updatedAt",
        header: "Ngày cập nhật",
        cell: ({ row }) => {
          return (
            <p className="max-w-[200px] break-words">
              {formateDate(row.getValue("updatedAt"))}
            </p>
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
                href={r(ROUTE_PATH.ADMIN.CATEGORIES.EDIT, {
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
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <Typography text="Quản lý categories" />

        <Link href={ROUTE_PATH.ADMIN.CATEGORIES.CREATE}>
          <Button type="button">Thêm mới</Button>
        </Link>
      </div>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={categoryList}
          filter={{
            field: "name",
            placeholder: "Nhập tên category ở đây",
          }}
        />
      </div>

      <BaseModal
        title="Xác nhận xoá"
        description="Ban có xác nhận muốn xoá category này không ?"
        open={openRemovedModal}
        setOpen={setOpenRemovedModal}
        onOk={handleRemoveCategory}
      />
    </section>
  );
}
