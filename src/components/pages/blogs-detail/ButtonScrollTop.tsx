"use client";

import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconChevronDown from "@/components/icons/IconChevronDown";
import { cn } from "@/libs/utils";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function ButtonScrollTop() {
  const { scrollYProgress } = useScroll();

  const [isOver, setIsOver] = useState(
    (scrollYProgress as any)?.current > 0.75 ? true : false,
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.75 && !isOver) setIsOver(true);
    if (latest <= 0.75 && isOver) setIsOver(false);
  });

  return (
    <div
      className={cn(
        "hover:bg-ddd group invisible fixed bottom-0 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary opacity-0 shadow transition-all duration-500 ease-linear md:right-6",
        {
          "visible bottom-20 opacity-100 md:bottom-6 md:right-6": isOver,
        },
      )}
      onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
    >
      <IconChevronDown className="h-6 w-6 rotate-180 stroke-white group-hover:stroke-primary" />
    </div>
  );
}
