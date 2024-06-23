"use client";

import Image from "next/image";

import { ROUTE_PATH } from "@/constants/routes";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { cn } from "@/libs/utils";
import { Link } from "@/navigation";
import Logo from "@/statics/images/full-logo.png";
import { type LinkType } from "@/types/common";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import IconDownload from "../icons/IconDownload";
import NavigationDrawer from "./Navigation/Drawer";
import SwitchLanguage from "./Navigation/SwitchLanguage";

export default function Header() {
  const t = useTranslations("common.headerMd");

  const isScrolled = useHeaderScroll({ limitScrollY: 70 });

  const HEADER_LINKS: LinkType[] = useMemo(() => {
    return [
      {
        label: t("about"),
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
        label: t("contact"),
        url: ROUTE_PATH.CONTACT,
      },
      {
        label: t("resume"),
        url: "",
        icon: IconDownload,
      },
    ];
  }, [t]);

  return (
    <header
      className={cn(
        "bg-background fixed left-0 top-0 z-20 w-full py-3 transition-all",
        isScrolled && "shadow-md",
      )}
    >
      <nav className="container mx-auto flex items-center justify-between gap-x-10">
        <Link href={ROUTE_PATH.HOME}>
          <Image src={Logo} alt="full-logo" width={224} height={80} />
        </Link>

        <ul className="flex list-none items-center gap-x-10 transition-all">
          {HEADER_LINKS.map((item, index) => {
            return (
              <li key={item.label + "_" + index} className="md:hidden lg:block">
                <Link
                  href={item.url}
                  className="flex items-center justify-center gap-x-2"
                >
                  <h3
                    className={cn(
                      "text-title text-sm font-medium capitalize xl:text-lg",
                    )}
                  >
                    {item.label}
                  </h3>
                  {item.icon && <item.icon width={20} height={20} />}
                </Link>
              </li>
            );
          })}

          <li className="md:hidden lg:block">
            <SwitchLanguage />
          </li>

          <li className="flex w-[50px] items-center justify-center md:block lg:hidden">
            <NavigationDrawer />
          </li>
        </ul>
      </nav>
    </header>
  );
}
