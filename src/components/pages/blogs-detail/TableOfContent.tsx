"use client";

import IconChevronUp from "@/components/icons/IconChevronUp";
import { cn } from "@/libs/utils";
import { Link } from "@/navigation";
import type { HeadingType } from "@/types/post";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const TableOfContents = ({ headings }: { headings: HeadingType[] }) => {
  const [active, setActive] = useState(
    headings && headings.length > 0 && headings?.[0]?.slug
      ? headings[0].slug
      : "",
  );

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(({ slug }) =>
        document.getElementById(slug),
      );
      const visibleHeadings: any[] = headingElements.filter((el) =>
        isElementInViewport(el),
      );
      if (visibleHeadings.length > 0 && visibleHeadings?.[0]?.id) {
        setActive(visibleHeadings?.[0]?.id);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  const isElementInViewport = (el: HTMLElement | null) => {
    const rect = el ? el.getBoundingClientRect() : null;

    return rect
      ? rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
      : {};
  };

  const t = useTranslations("common");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[10px] border border-[#ddd] bg-transparent lg:sticky lg:top-32",
        isExpanded ? "pb-6" : "pb-12 md:pb-6",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-y-4 overflow-hidden px-4 pb-8 pt-6 transition-all md:pb-0 lg:px-6",
          isExpanded ? "h-auto md:h-auto" : "h-[225px] md:h-auto",
        )}
      >
        <p className="text-xl font-bold text-primary">{t("toc")}</p>

        {headings.map((heading) => {
          return (
            <Link
              className={cn("text-base font-bold text-title", {
                "pl-4": heading.level === 3,
              })}
              key={heading.text}
              href={`#${heading.slug}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(heading.slug)!
                  .scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <p
                className={cn(
                  "w-fit border-b-0 border-transparent transition-all",
                  {
                    "w-fit rounded-[6px] border-b-2 border-primary pb-1 text-primary ease-linear":
                      active === heading.slug,
                  },
                )}
              >
                {heading.text}
              </p>
            </Link>
          );
        })}
      </div>

      <p
        className="absolute bottom-0 left-1/2 my-4 flex h-fit w-fit -translate-x-1/2 cursor-pointer items-center gap-x-2 font-bold text-title transition-all md:hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Thu gọn" : "Mở rộng"}

        <IconChevronUp className={cn(isExpanded ? "" : "rotate-180")} />
      </p>
    </div>
  );
};
