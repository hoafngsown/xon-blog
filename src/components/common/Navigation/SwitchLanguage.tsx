"use client";

import { locales } from "@/configs/locale";
import { cn } from "@/libs/utils";
import { Link } from "@/navigation";
import { Separator } from "@radix-ui/react-separator";
import { usePathname } from "next/navigation";

export default function SwitchLanguage() {
  const pathname = usePathname();

  const getActiveLocale = (locale: string) => {
    return pathname.startsWith(`/${locale}`);
  };

  return (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <Link href="/" locale={locales[0]}>
        <p
          className={cn(
            "cursor-pointer text-lg font-bold",
            getActiveLocale(locales[0]!) && "text-primary",
          )}
        >
          VI
        </p>
      </Link>
      <Separator orientation="vertical" className="h-full w-[2px] bg-[#ccc]" />
      <Link href="/" locale={locales[1]}>
        <p
          className={cn(
            "cursor-pointer text-lg font-bold",
            getActiveLocale(locales[1]!) && "text-primary",
          )}
        >
          EN
        </p>
      </Link>
    </div>
  );
}
