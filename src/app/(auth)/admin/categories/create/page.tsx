"use client";

import AdminChildLayout from "@/components/layouts/AdminChildLayout";
import FormAddEditCategory from "@/components/pages/admin/categories/FormAddEditCategory";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATH } from "@/constants/routes";
import { useRouter } from "next/navigation";

export default function CreateCategory() {
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = () => {
    toast({ title: "Chỉnh sửa thành công" });

    router.push(ROUTE_PATH.ADMIN.CATEGORIES.INDEX);
  };

  return (
    <AdminChildLayout>
      <FormAddEditCategory onSubmit={onSubmit} />;
    </AdminChildLayout>
  );
}
