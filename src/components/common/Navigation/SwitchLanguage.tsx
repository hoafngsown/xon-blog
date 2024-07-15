"use client";

import { locales } from "@/configs/locale";
import { cn } from "@/libs/utils";
import { Link, usePathname } from "@/navigation";
import { Separator } from "@radix-ui/react-separator";
import { useLocale } from "next-intl";

export default function SwitchLanguage() {
  const locale = useLocale();

  const pathname = usePathname();

  return (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <Link
        href={pathname}
        locale={locales[0]}
        title={`Switch to ${locales[0]}`}
      >
        <h2
          className={cn(
            "cursor-pointer text-lg font-bold",
            locale === locales[0]! && "text-primary",
          )}
        >
          VI
        </h2>
      </Link>
      <Separator orientation="vertical" className="h-full w-[2px] bg-[#ccc]" />
      <Link
        href={pathname}
        locale={locales[1]}
        title={`Switch to ${locales[1]}`}
      >
        <h2
          className={cn(
            "cursor-pointer text-lg font-bold",
            locale === locales[1] && "text-primary",
          )}
        >
          EN
        </h2>
      </Link>
    </div>
  );
}
