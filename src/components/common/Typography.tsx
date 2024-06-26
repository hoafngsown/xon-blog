import { cn } from "@/libs/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  text: string;
}

export default function Typography({ text, ...others }: Props) {
  return (
    <h2
      {...others}
      className={cn("text-primary text-lg font-bold", others?.className)}
    >
      {text}
    </h2>
  );
}
