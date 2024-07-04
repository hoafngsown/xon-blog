"use client";

import AdminChildLayout from "@/components/layouts/AdminChildLayout";
import FormAddEditPost from "@/components/pages/admin/posts/FormAddEditPost";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATH } from "@/constants/routes";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = () => {
    toast({ title: "Thêm bài viết thành công" });

    router.push(ROUTE_PATH.ADMIN.POSTS.INDEX);
  };

  return (
    <AdminChildLayout>
      <FormAddEditPost onSubmit={onSubmit} />;
    </AdminChildLayout>
  );
}
