"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ROUTE_PATH } from "@/constants/routes";
import { cn } from "@/libs/utils";
import { Link, usePathname } from "@/navigation";
import { type LinkType } from "@/types/common";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import IconClose from "../../icons/IconClose";
import IconMenu from "../../icons/IconMenu";
import { ModeToggle } from "../ToggleTheme";
import SwitchLanguage from "./SwitchLanguage";

export default function NavigationDrawer() {
  const t = useTranslations("common.drawer");

  const pathname = usePathname();

  const [openDrawer, setOpenDrawer] = useState(false);

  const DRAWER_LINK: LinkType[] = useMemo(() => {
    return [
      {
        label: t("home"),
        url: ROUTE_PATH.HOME,
      },
      {
        label: t("about"),
        url: ROUTE_PATH.ABOUT,
      },
      {
        label: t("blog"),
        url: ROUTE_PATH.BLOG.INDEX,
      },
      {
        label: t("experience"),
        url: ROUTE_PATH.EXPERIENCES,
      },
      {
        label: t("lifetime"),
        url: ROUTE_PATH.LIFETIME,
      },
      {
        label: t("contact"),
        url: ROUTE_PATH.CONTACT,
      },
    ];
  }, [t]);

  return (
    <Drawer
      open={openDrawer}
      onOpenChange={setOpenDrawer}
      direction="bottom"
      closeThreshold={0.5}
    >
      <DrawerTrigger asChild>
        <IconMenu />
      </DrawerTrigger>
      <DrawerContent className="z-[1000] h-full w-full">
        <nav className="relative mx-auto flex h-full w-full max-w-sm">
          <DrawerClose asChild className="absolute right-0 top-0">
            <IconClose width={28} height={28} />
          </DrawerClose>
          <ul className="flex h-full w-full flex-col items-center justify-center gap-y-8">
            {DRAWER_LINK.map((item, index) => {
              const isActive =
                item.url === ROUTE_PATH.HOME
                  ? pathname === ROUTE_PATH.HOME
                  : item.url && pathname.startsWith(item.url);
              return (
                <li key={item.label + "_" + index}>
                  <Link
                    title={`Go to ${item.url}`}
                    href={item.url}
                    className="flex items-center justify-center gap-x-2"
                    onClick={() => item.url && setOpenDrawer(false)}
                  >
                    <h3
                      className={cn(
                        "text-xl font-medium capitalize text-title",
                        isActive && "text-primary",
                      )}
                    >
                      {item.label}
                    </h3>
                    {item.icon && <item.icon />}
                  </Link>
                </li>
              );
            })}

            <li className="mt-10">
              <SwitchLanguage />
            </li>

            <li className="mt-10">
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
