"use client";

import AdminChildLayout from "@/components/layouts/AdminChildLayout";
import FormAddEditCategory from "@/components/pages/admin/categories/FormAddEditCategory";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATH } from "@/constants/routes";
import { useLoader } from "@/hooks/useLoader";
import { categoryServices } from "@/services/client/categories.service";
import type { CategoryType } from "@/types/categories";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCategory() {
  const { toast } = useToast();
  const { id } = useParams();
  const { showLoader } = useLoader();
  const router = useRouter();

  const [category, setCategory] = useState<CategoryType>();

  const fetchCategoryDetail = async () => {
    try {
      showLoader(true);
      const category = await categoryServices.getById(Number(id));
      setCategory(category);
    } catch (error) {
      toast({ variant: "destructive", title: "Đã có lỗi xảy ra" });
    } finally {
      showLoader(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchCategoryDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!category) return null;

  const onSubmit = () => {
    toast({ title: "Chỉnh sửa thành công" });

    router.push(ROUTE_PATH.ADMIN.CATEGORIES.INDEX);
  };

  return (
    <AdminChildLayout>
      <FormAddEditCategory defaultValues={category} onSubmit={onSubmit} />;
    </AdminChildLayout>
  );
}
