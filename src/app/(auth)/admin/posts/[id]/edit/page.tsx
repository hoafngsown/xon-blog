"use client";

import AdminChildLayout from "@/components/layouts/AdminChildLayout";
import FormAddEditPost from "@/components/pages/admin/posts/FormAddEditPost";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATH } from "@/constants/routes";
import { useLoader } from "@/hooks/useLoader";
import { postServices } from "@/services/client/posts.service";
import type { PostType } from "@/types/post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPost() {
  const { toast } = useToast();
  const { id } = useParams();
  const { showLoader } = useLoader();
  const router = useRouter();

  const [post, setPost] = useState<PostType>();

  const fetchPost = async () => {
    try {
      showLoader(true);
      const postResponse = await postServices.getById(Number(id));
      setPost(postResponse);
    } catch (error) {
      toast({ variant: "destructive", title: "Đã có lỗi xảy ra" });
    } finally {
      showLoader(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) return null;

  const onSubmit = () => {
    toast({ title: "Chỉnh sửa thành công" });

    router.push(ROUTE_PATH.ADMIN.POSTS.INDEX);
  };

  return (
    <AdminChildLayout>
      <FormAddEditPost
        defaultValues={{
          ...post,
          tags: post.tags.join(","),
          priority: post.priority,
          categories: post.categories.map((item: any) =>
            String(item.categoryId),
          ),
          publishAt: post.publishAt ? new Date(post.publishAt) : null,
        }}
        onSubmit={onSubmit}
      />
    </AdminChildLayout>
  );
}
