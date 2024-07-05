"use client";

import { MovingBorderComponent } from "@/components/animations/MovingBorderComponent";

import { ROUTE_PATH } from "@/constants/routes";
import { cn } from "@/libs/utils";
import { usePathname } from "@/navigation";
import { type ReactNode } from "react";

interface Props {
  slug: string;
  children: ReactNode;
}
export default function BlogTag(props: Props) {
  const pathname = usePathname();

  const category = pathname.replace(`${ROUTE_PATH.BLOG.INDEX}/`, "");

  const active = category === props.slug || props.slug === "";

  const childComponents = (
    <p
      className={cn(
        "flex w-fit items-center justify-between gap-x-4 rounded-[10px] px-4 py-2 font-bold text-secondary dark:text-title",
        active ? "bg-primary text-white" : "border dark:border-primary",
      )}
    >
      {props.children}
    </p>
  );

  return active ? (
    <MovingBorderComponent
      borderRadius="10px"
      containerClassName="flex-shrink-0 overflow-hidden bg-primary bg-transparent"
    >
      {childComponents}
    </MovingBorderComponent>
  ) : (
    childComponents
  );
}
