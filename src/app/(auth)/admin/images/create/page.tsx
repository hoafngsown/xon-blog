"use client";

import AdminChildLayout from "@/components/layouts/AdminChildLayout";
import FormAddEditImages from "@/components/pages/admin/images/FormAddEditImage";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATH } from "@/constants/routes";
import { useRouter } from "next/navigation";

export default function CreateImage() {
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = () => {
    toast({ title: "Tạo mới thành công" });

    router.push(ROUTE_PATH.ADMIN.IMAGES.INDEX);
  };

  return (
    <AdminChildLayout>
      <FormAddEditImages onSubmit={onSubmit} />;
    </AdminChildLayout>
  );
}
