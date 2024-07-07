import Image from "next/image";
import React from "react";
import Logo from "@/../public/logo.png";
import { MY_SOCIAL_LINK } from "@/constants/common";

export default function BlogAuthorInfo() {
  return (
    <a href={MY_SOCIAL_LINK.FB} target="_blank">
      <div className="flex flex-col gap-x-2 md:flex-row md:gap-x-4">
        <div className="relative h-[100px] w-[100px] flex-shrink-0 rounded-full bg-white">
          <Image src={Logo} alt="logo" layout="fill" objectFit="cover" />
        </div>

        <div className="mt-3 flex flex-col gap-y-2 md:mt-0">
          <p className="text-xl font-bold text-primary">Hoàng Sơn</p>
          <p className="text-base font-medium text-secondary">
            Cảm ơn bạn đã dành thời gian đọc qua bài viết trên của mình, nếu có
            bất kỳ câu hỏi gì, thì cứ nhắn tin cho mình nhé. Hi vọng mình đã
            giúp ích cho bạn &apos;một phần nào đấy&apos;.
          </p>
        </div>
      </div>
    </a>
  );
}
