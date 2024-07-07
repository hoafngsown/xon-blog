"use client";

import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/libs/utils";
import { postServices } from "@/services/client/posts.service";
import type { CommentBodyType, CommentType } from "@/types/comment";
import { ECommentStatus } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import BlogCommentItem from "./BlogCommentItem";
import FormComment from "./FormComment";
import type { LocaleType } from "@/types/common";

export default function BlogCommentList({ postId }: { postId: number }) {
  const t = useTranslations("page.blogsDetail.form");
  const locale = useLocale();
  const { toast } = useToast();

  const [commentList, setCommentList] = useState<CommentType[]>([]);

  const fetchCommentList = async (id: number) => {
    try {
      const comments: any = await postServices.getComments(id);
      setCommentList(comments);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleAddComment = async (body: CommentBodyType) => {
    try {
      await postServices.createComment(postId, {
        ...body,
        status: ECommentStatus.NotApprove,
      });
      toast({
        title: t("success"),
      });
    } catch (error) {
      toast({
        title: t("error"),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchCommentList(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border-t-ddd mt-8 w-full border-t border-solid pt-5 sm:mt-10 md:pt-10">
      <p className="text-2xl font-bold text-primary">
        {t("total").replace("$$", commentList.length + "")}
      </p>

      <div className="mt-5 flex flex-col gap-y-6 md:gap-y-8">
        {commentList.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col gap-y-4 border-b border-dashed border-[#ddd]/50 pb-6",
            )}
          >
            <BlogCommentItem
              t={t}
              locale={locale as LocaleType}
              key={item.id}
              comment={item}
              onSubmit={(data) =>
                handleAddComment({ ...data, replyToId: item.id })
              }
            />
            <div className="flex flex-col gap-y-4 pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20">
              {item?.replies?.map((cmt) => (
                <BlogCommentItem
                  locale={locale as LocaleType}
                  t={t}
                  key={cmt.id}
                  comment={cmt}
                  onSubmit={(data) =>
                    handleAddComment({ ...data, replyToId: item.id })
                  }
                />
              ))}
            </div>
          </div>
        ))}

        <FormComment title={t("reply1")} onSubmit={handleAddComment} />
      </div>
    </div>
  );
}
