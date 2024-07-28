/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import Image from "next/image";

import { ROUTE_PATH } from "@/constants/routes";
import { cn } from "@/libs/utils";
import { Link, usePathname } from "@/navigation";

import { type LinkType } from "@/types/common";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import IconArrowHeader from "../icons/IconArrowHeader";
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
      label: t("lifetime"),
      url: ROUTE_PATH.LIFETIME,
    },
    {
      label: t("contact"),
      url: ROUTE_PATH.CONTACT,
    },
  ];

  const { scrollY } = useScroll();

  const [isOver, setIsOver] = useState(
    (scrollY as any)?.current > 100 ? true : false,
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 100 && !isOver) setIsOver(true);
    if (latest <= 0 && isOver) setIsOver(false);
  });

  return (
    <header className={cn("relative z-[1000] h-20 w-full")}>
      <div
        className={cn(
          isOver
            ? "header-scroll border-b border-b-[#ddd]/50 bg-background shadow"
            : "bg-transparent",
        )}
      >
        <nav
          className={cn(
            "container mx-auto flex items-center justify-between gap-x-10 py-3",
          )}
        >
          <Link href={ROUTE_PATH.HOME} className="flex" title="Go to main page">
            <div className="relative h-[70px] w-[70px] rounded-full bg-white">
              <Image
                src="/logo.png"
                alt="full-logo"
                title="full-logo-image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <IconArrowHeader className="w-10" />
              <p className="ml-7 font-bold text-primary dark:text-secondary">
                Đây là Sơn
              </p>
            </div>
          </Link>

          <ul className="flex list-none items-center gap-x-10 transition-all">
            {HEADER_LINKS.map((item, index) => {
              const isActive = item.url && pathname.startsWith(item.url);
              return (
                <li
                  key={item.label + "_" + index}
                  className="md:hidden lg:block"
                >
                  <Link
                    title={`Go to ${item.url}`}
                    href={item.url}
                    className={cn(
                      "relative flex items-center justify-center gap-x-2 transition-all after:w-0",
                    )}
                  >
                    <h1
                      className={cn(
                        "text-sm font-medium capitalize text-title xl:text-lg",
                        isActive && "text-primary",
                      )}
                    >
                      {item.label}
                    </h1>
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
      </div>
    </header>
  );
}
