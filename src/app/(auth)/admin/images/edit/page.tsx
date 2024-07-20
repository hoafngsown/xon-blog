"use client";

import AdminChildLayout from "@/components/layouts/AdminChildLayout";
import FormAddEditImages from "@/components/pages/admin/images/FormAddEditImage";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATH } from "@/constants/routes";
import { useLoader } from "@/hooks/useLoader";
import type { AddEditImageItemType } from "@/libs/schema/image.schema";
import { imageServices } from "@/services/client/images.service";
import type { ImageType } from "@/types/images";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditImage() {
  const { toast } = useToast();
  const { showLoader } = useLoader();
  const router = useRouter();

  const [images, setImages] = useState<ImageType[]>([]);

  const fetchImages = async () => {
    try {
      showLoader(true);
      const res = await imageServices.getAll();
      setImages(res);
    } catch (error) {
      toast({ variant: "destructive", title: "Đã có lỗi xảy ra" });
    } finally {
      showLoader(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!images.length) return null;

  const onSubmit = () => {
    toast({ title: "Chỉnh sửa thành công" });

    router.push(ROUTE_PATH.ADMIN.IMAGES.INDEX);
  };

  return (
    <AdminChildLayout>
      <FormAddEditImages
        isEdit
        defaultValues={
          images?.map((item) => ({
            id: item.id,
            text: item.text,
            url: item.url,
          })) as AddEditImageItemType[]
        }
        onSubmit={onSubmit}
      />
    </AdminChildLayout>
  );
}
