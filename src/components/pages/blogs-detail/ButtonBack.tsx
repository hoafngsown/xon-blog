"use client";

import { useRouter } from "@/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

export default function ButtonBack() {
  const router = useRouter();
  const t = useTranslations();

  return (
    <p
      className="absolute -top-0 left-0 flex w-fit cursor-pointer items-center gap-x-2 sm:text-base md:text-lg"
      onClick={() => router.back()}
    >
      <ChevronLeftIcon className="stroke-secondary sm:h-6 sm:w-6" />
      <span className="font-bold text-secondary">
        {t("page.blogsDetail.back")}
      </span>
    </p>
  );
}
