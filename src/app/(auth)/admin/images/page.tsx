"use client";

import { DataTable } from "@/components/common/Table/DataTable";
import Typography from "@/components/common/Typography";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATH } from "@/constants/routes";
import { useLoader } from "@/hooks/useLoader";
import { imageServices } from "@/services/client/images.service";
import type { ImageType } from "@/types/images";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ImageList() {
  const { toast } = useToast();
  const { showLoader } = useLoader();
  const [imageList, setImageList] = useState<ImageType[]>([]);

  const fetchImageList = async () => {
    try {
      showLoader(true);
      const response = await imageServices.getAll();

      setImageList(response);
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra.",
        variant: "destructive",
      });
    } finally {
      showLoader(false);
    }
  };

  const columns: ColumnDef<ImageType>[] = useMemo(() => {
    return [
      {
        accessorKey: "url",
        header: "Ảnh",
        cell: ({ row }) => {
          return (
            <div className="relative h-28 w-28 rounded-[10px]">
              <Image
                src={row.getValue("url")}
                objectFit="contain"
                alt="url"
                layout="fill"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "text",
        header: "Text",
        cell: ({ row }) => {
          return (
            <p className="max-w-[200px] break-words">{row.getValue("text")}</p>
          );
        },
      },
      // {
      //   accessorKey: "id",
      //   header: "Thao tác",
      //   cell: ({ row }) => {
      //     const id = parseInt(row.getValue("id"));
      //     return (
      //       <Link
      //         href={r(ROUTE_PATH.ADMIN.CATEGORIES.EDIT, {
      //           id,
      //         })}
      //       >
      //         <Button className="p-1">
      //           <IconEdit className="stroke-white" />
      //         </Button>
      //       </Link>
      //     );
      //   },
      // },
    ];
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchImageList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <Typography text="Quản lý images" />

        <div className="flex items-center gap-x-4">
          <Link href={ROUTE_PATH.ADMIN.IMAGES.CREATE}>
            <Button type="button">Thêm mới</Button>
          </Link>
          <Link href={ROUTE_PATH.ADMIN.IMAGES.EDIT}>
            <Button type="button" variant="outline">
              Chỉnh sửa
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={imageList}
          filter={{
            field: "text",
            placeholder: "Nhập text ở đây",
          }}
        />
      </div>
    </section>
  );
}
