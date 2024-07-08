/* eslint-disable @typescript-eslint/no-unsafe-call */
import Logo from "@/../public/logo.png";
import type { CommentBodyType, CommentType } from "@/types/comment";
import type { LocaleType } from "@/types/common";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import { useState } from "react";
import FormComment from "./FormComment";

export default function BlogCommentItem({
  comment,
  onSubmit,
  t,
  locale,
}: {
  comment: Partial<CommentType>;
  onSubmit: (body: CommentBodyType) => Promise<void>;
  t: any;
  locale: LocaleType;
}) {
  const [openFormChat, setOpenFormChat] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div className="flex flex-col gap-y-4">
      <div className="relative flex flex-col gap-x-2 rounded-[10px] bg-[#ddd]/30 p-4 dark:bg-[#ddd]/10 md:flex-row md:gap-x-4">
        <div className="relative h-[65px] w-[65px] flex-shrink-0 rounded-full bg-white">
          <Image src={Logo} alt="logo" layout="fill" objectFit="cover" />
        </div>

        <div className="mt-3 flex flex-col gap-y-2 md:mt-0">
          <p className="text-base font-bold text-primary md:text-lg">
            {comment.name ?? ""}
            <span className="ml-2 inline-block text-sm font-medium text-title md:text-base">
              {t("reply3")}:
            </span>
          </p>
          <p className="text-base font-medium text-secondary md:text-lg">
            {comment.content ?? ""}
          </p>
          <p className="text-sm font-medium text-title md:text-base">
            {formatDate(comment.createdAt as any, locale)}
          </p>
        </div>

        <button
          className="absolute bottom-3 right-3 border-none text-sm text-secondary outline-none"
          onClick={() => {
            setOpenFormChat(true);
            setTitle(comment.name ?? "");
          }}
        >
          {t("button")}
        </button>
      </div>

      {openFormChat && (
        <FormComment
          onSubmit={(data) => onSubmit(data)}
          setOpen={setOpenFormChat}
          title={t("reply2").replace("$$", title)}
        />
      )}
    </div>
  );
}
