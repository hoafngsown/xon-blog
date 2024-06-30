import type { BreadcrumbType } from "@/types/common";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { locales } from "@/configs/locale";
import { cn } from "@/libs/utils";
import { Link } from "@/navigation";
import { getLocale } from "next-intl/server";
import { Fragment } from "react";
import Typography from "./Typography";

interface Props {
  breadcrumbs: BreadcrumbType[];
  containerClassName?: string;
}

export default async function Breadcrumbs({
  breadcrumbs,
  containerClassName = "",
}: Props) {
  const locale = await getLocale();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-y-1",
        containerClassName,
      )}
    >
      <Typography
        text={locale === locales[0] ? "Bạn đang xem:" : "You watching:"}
        className="text-base text-secondary md:text-lg"
      />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => {
            const isLastItem = index === breadcrumbs.length - 1;
            return (
              <Fragment key={item.label + "_" + index}>
                <BreadcrumbItem
                  className={cn(
                    "group",
                    isLastItem ? "pointer-events-none" : "hover:underline",
                  )}
                >
                  <Link href={item.url} legacyBehavior>
                    <BreadcrumbLink>
                      <span
                        className={cn(
                          "font-medium italic text-title md:text-base",
                          isLastItem
                            ? "text-secondary"
                            : "group-hover:font-medium",
                        )}
                      >
                        {item.label}
                      </span>
                      {item.icon && item.icon}
                    </BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>

                {!isLastItem && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
