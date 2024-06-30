import { cn } from "@/libs/utils";

interface Props {
  text: string;
  required?: boolean;
  className?: string;
}

export default function Label({ text, required, className }: Props) {
  return (
    <label
      className={cn("text-sm font-bold text-secondary md:text-base", className)}
    >
      {text}
      {required && <span className="ml-1 text-red-500 sm:ml-2">(*)</span>}
    </label>
  );
}
