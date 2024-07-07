import { cn } from "@/libs/utils";
import React, { type DetailedHTMLProps, type HTMLAttributes } from "react";

export default function MdxHeading({
  As,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
  As: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) {
  const getTitleSize = () => {
    const level = Number(As.replace("h", ""));

    const size = 2.25 - level * 0.25;

    return size;
  };

  return (
    <As
      {...props}
      className={cn("mt-[1.5rem] font-bold text-primary", props.className)}
      style={{
        fontSize: getTitleSize() + "rem",
      }}
    />
  );
}
