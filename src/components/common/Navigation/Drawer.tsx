"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ROUTE_PATH } from "@/constants/routes";
import { cn } from "@/libs/utils";
import { Link } from "@/navigation";
import { type LinkType } from "@/types/common";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import IconClose from "../../icons/IconClose";
import IconDownload from "../../icons/IconDownload";
import IconMenu from "../../icons/IconMenu";
import SwitchLanguage from "./SwitchLanguage";

export default function NavigationDrawer() {
  const t = useTranslations("common.drawer");

  const [openDrawer, setOpenDrawer] = useState(false);

  const DRAWER_LINK: LinkType[] = useMemo(() => {
    return [
      {
        label: t("home"),
        url: ROUTE_PATH.HOME,
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
        label: t("resume"),
        url: "",
        icon: IconDownload,
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
      <DrawerContent className="h-full w-full">
        <div className="relative mx-auto flex h-full w-full max-w-sm">
          <DrawerClose asChild className="absolute right-0 top-0">
            <IconClose width={28} height={28} />
          </DrawerClose>
          <ul className="flex h-full w-full flex-col items-center justify-center gap-y-8">
            {DRAWER_LINK.map((item, index) => {
              return (
                <li key={item.label + "_" + index}>
                  <Link
                    href={item.url}
                    className="flex items-center justify-center gap-x-2"
                    onClick={() => item.url && setOpenDrawer(false)}
                  >
                    <h3
                      className={cn(
                        "text-title text-xl font-medium capitalize",
                      )}
                    >
                      {item.label}
                    </h3>
                    {item.icon && <item.icon />}
                  </Link>
                </li>
              );
            })}
            <SwitchLanguage />
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
