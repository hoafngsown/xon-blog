"use client";
import { type LinkType } from "@/types/common";

import { ROUTE_PATH } from "@/constants/routes";
import { cn } from "@/libs/utils";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import IconBookText from "../../icons/IconBookText";
import IconDoorOpen from "../../icons/IconDoorOpen";
import IconMails from "../../icons/IconMails";
import NavigationDrawer from "./Drawer";

export default function BottomNavigation() {
  const t = useTranslations("common.navigation");

  const pathname = usePathname();

  const MOBILE_LINK: LinkType[] = useMemo(() => {
    return [
      {
        label: t("home"),
        url: ROUTE_PATH.HOME,
        icon: IconDoorOpen,
      },
      {
        label: t("blog"),
        url: ROUTE_PATH.BLOG.INDEX,
        icon: IconBookText,
      },
      {
        label: t("contact"),
        url: ROUTE_PATH.CONTACT,
        icon: IconMails,
      },
    ];
  }, [t]);

  return (
    <nav className="fixed bottom-3 left-0 z-10 h-[50px] w-full rounded-[40px] px-2">
      <ul className="flex h-full list-none items-stretch justify-between overflow-hidden rounded-[40px] border border-solid border-primary bg-white p-1.5 dark:bg-black">
        {MOBILE_LINK.map((item, index) => {
          const isActive = pathname === item.url;
          return (
            <li
              key={item.label + "_" + index}
              className={cn("flex-1 rounded-[40px]", isActive && "bg-primary")}
            >
              <Link
                title="navigation"
                href={item.url}
                className="flex h-full items-center justify-center gap-x-1 sm:gap-x-2"
              >
                {item.icon && (
                  <item.icon
                    className={cn(isActive ? "stroke-white" : "stroke-title")}
                  />
                )}
                <h3
                  className={cn(
                    "text-xs font-medium capitalize sm:text-sm",
                    isActive && "text-white",
                  )}
                >
                  {item.label}
                </h3>
              </Link>
            </li>
          );
        })}
        <li className="flex w-[50px] items-center justify-center">
          <NavigationDrawer />
        </li>
      </ul>
    </nav>
  );
}
