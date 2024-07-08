"use client";

import { DataTable } from "@/components/common/Table/DataTable";
import Typography from "@/components/common/Typography";
import { useToast } from "@/components/ui/use-toast";
import { useLoader } from "@/hooks/useLoader";
import { contactServices } from "@/services/client/contacts.service";
import type { ContactType } from "@/types/contact";
import { formatDate } from "@/utils/date";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

export default function ContactListPage() {
  const { toast } = useToast();
  const { showLoader } = useLoader();
  const [contactList, setContactList] = useState<ContactType[]>([]);

  const fetchContactList = async () => {
    try {
      showLoader(true);
      const response = await contactServices.getAll();

      setContactList(response);
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra.",
        variant: "destructive",
      });
    } finally {
      showLoader(false);
    }
  };

  const columns: ColumnDef<ContactType>[] = useMemo(() => {
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
        accessorKey: "content",
        header: "Nội dung",
        cell: ({ row }) => {
          return (
            <p className="break-word max-w-[700px] font-medium">
              {row.getValue("content")}
            </p>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
          return (
            <p className="break-word  font-medium">{row.getValue("email")}</p>
          );
        },
      },
      {
        accessorKey: "phone",
        header: "Số điện thoại",
        cell: ({ row }) => {
          return (
            <p className="max-w-[200px] break-words">{row.getValue("phone")}</p>
          );
        },
      },

      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) => {
          return (
            <p className="max-w-[200px] break-words">
              {formatDate(row.getValue("createdAt"))}
            </p>
          );
        },
      },
    ];
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchContactList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <Typography text="Quản lý danh sách liên hệ" />
      </div>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={contactList}
          filter={{
            field: "name",
            placeholder: "Nhập tên ở đây",
          }}
        />
      </div>
    </section>
  );
}
