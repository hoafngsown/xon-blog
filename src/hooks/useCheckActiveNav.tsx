"use client";

import { ROUTE_PATH } from "@/constants/routes";
import { usePathname } from "next/navigation";

export default function useCheckActiveNav() {
  const pathname = usePathname();

  const checkActiveNav = (nav: string) => {
    if (pathname === ROUTE_PATH.ADMIN.INDEX && nav === ROUTE_PATH.ADMIN.INDEX)
      return true;

    return (
      nav !== ROUTE_PATH.ADMIN.INDEX &&
      pathname !== ROUTE_PATH.ADMIN.INDEX &&
      pathname.startsWith(nav)
    );
  };

  return { checkActiveNav };
}
