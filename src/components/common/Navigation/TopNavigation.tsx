"use client";

import { cn } from "@/libs/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function TopNavigation() {
  const t = useTranslations("common.headerMobile");

  const { scrollYProgress } = useScroll();

  const [isScrollOver, setIsScrollOver] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      if (scrollYProgress.get() < 0.05) {
        setIsScrollOver(false);
      } else {
        setIsScrollOver(true);
      }
    }
  });

  return (
    <header>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            y: 0,
            boxShadow: "none",
          }}
          animate={{
            y: isScrollOver ? -35 : 0,
            boxShadow:
              "0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(25, 28, 33, 0.02), 0px 0px 0px 1px rgba(25, 28, 33, 0.08)",
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "fixed left-0 top-0 z-30 flex h-[80px] w-full flex-col items-center justify-center gap-y-1 bg-background py-4",
          )}
        >
          <p className="text-xl font-bold uppercase text-black/70 dark:text-title">
            {t("title")}
          </p>
          <p className="font-medium text-black/70 dark:text-title">
            {t("description")}
          </p>
        </motion.div>
      </AnimatePresence>
    </header>
  );
}
