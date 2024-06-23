"use client";

import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TopNavigation() {
  const t = useTranslations("common.headerMobile");

  const isScrolled = useHeaderScroll({});

  return (
    <header>
      <motion.div
        initial={{ opacity: 0, translateX: 200 }} // Trạng thái ban đầu là không thấy và dịch chuyển xuống 50px
        animate={{ opacity: 1, translateX: 0 }} // Trạng thái khi hoạt ảnh hoàn thành là đầy đủ và dịch chuyển về vị trí ban đầu
        transition={{ duration: 0.5, ease: "easeOut" }} // Thời gian chuyển đổi là 1 giây với hiệu ứng easeOut
        className={cn(
          "bg-background fixed left-0 top-0 z-20 flex h-[80px] w-full flex-col items-center justify-center gap-y-1 py-4",
          isScrolled && "shadow-lg",
        )}
      >
        <p className="text-xl font-bold uppercase text-black/70">
          {t("title")}
        </p>
        <p className="font-medium text-black/70">{t("description")}</p>
      </motion.div>
    </header>
  );
}
