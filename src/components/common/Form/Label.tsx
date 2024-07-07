import { cn } from "@/libs/utils";

interface Props {
  text: string;
  required?: boolean;
  className?: string;
  textHelper?: string;
}

export default function Label({
  text,
  required,
  className,
  textHelper,
}: Props) {
  return (
    <label
      className={cn("text-base font-bold text-secondary md:text-lg", className)}
    >
      {text}
      {required && <span className="ml-1 text-red-500 sm:ml-2">(*)</span>}

      {textHelper && <p className="text-sm font-medium italic">{textHelper}</p>}
    </label>
  );
}
