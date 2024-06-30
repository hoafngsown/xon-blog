"use client";

import Image from "next/image";

import { ROUTE_PATH } from "@/constants/routes";
import { cn } from "@/libs/utils";
import { Link, usePathname } from "@/navigation";
import Logo from "@/statics/icons/logo.svg";
import { type LinkType } from "@/types/common";
import { useTranslations } from "next-intl";
import NavigationDrawer from "./Navigation/Drawer";
import SwitchLanguage from "./Navigation/SwitchLanguage";
import { ModeToggle } from "./ToggleTheme";

export default function Header() {
  const t = useTranslations("common.headerMd");
  const pathname = usePathname();

  const HEADER_LINKS: LinkType[] = [
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
      label: t("contact"),
      url: ROUTE_PATH.CONTACT,
    },
  ];

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-[1000] w-full bg-background py-3 shadow-sm transition-all",
      )}
    >
      <nav className="container mx-auto flex items-center justify-between gap-x-10">
        <Link href={ROUTE_PATH.HOME}>
          <Image src={Logo} alt="full-logo" width={224} height={80} />
        </Link>

        <ul className="flex list-none items-center gap-x-10 transition-all">
          {HEADER_LINKS.map((item, index) => {
            const isActive = item.url && pathname.startsWith(item.url);
            return (
              <li key={item.label + "_" + index} className="md:hidden lg:block">
                <Link
                  href={item.url}
                  className={cn(
                    "relative flex items-center justify-center gap-x-2 transition-all after:w-0",
                  )}
                >
                  <h3
                    className={cn(
                      "text-sm font-medium capitalize text-title xl:text-lg",
                      isActive && "text-primary",
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

          <ModeToggle />
        </ul>
      </nav>
    </header>
  );
}
