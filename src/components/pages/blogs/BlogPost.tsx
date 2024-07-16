/* eslint-disable @typescript-eslint/no-unsafe-call */
import BaseAnimation from "@/components/animations/BaseAnimation";
import Tag from "@/components/common/Tag";
import IconChevronRight from "@/components/icons/IconChevronRight";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
import { ROUTE_PATH } from "@/constants/routes";
import { cn } from "@/libs/utils";
import { Link } from "@/navigation";
import type { LocaleType } from "@/types/common";
import type { PostMetaType } from "@/types/post";
import { formatDate } from "@/utils/date";
import { r } from "@/utils/route";

interface Props {
  item: PostMetaType;
  isLast: boolean;
  locale: LocaleType;
  t: any;
}

export default function BlogPost({ item, isLast, locale, t }: Props) {
  return (
    <BaseAnimation>
      <TimelineItem className={cn("w-full pb-8 md:pb-12", isLast && "!pb-0")}>
        <TimelineConnector className="hidden sm:block" />
        <TimelineHeader>
          <TimelineTime className="hidden w-24 break-words pl-4 lg:block lg:pl-0">
            {formatDate(item.publishAt, locale, { hideTime: true })}
          </TimelineTime>
          <TimelineIcon className="hidden sm:block" />
          <TimelineTitle>
            <div className="flex flex-col gap-2 md:pl-6">
              <span className="whitespace-normal text-nowrap text-xs font-semibold leading-none text-secondary md:text-sm lg:hidden">
                {formatDate(item.publishAt, locale, { hideTime: true })}
              </span>

              <Link
                href={r(ROUTE_PATH.BLOG.DETAIL, { id: item.slug })}
                title={`Go to blog ${item.title}`}
              >
                <p className="flex items-center gap-x-2 text-base text-primary md:text-xl">
                  <span>{item.title}</span>
                </p>
              </Link>
            </div>
          </TimelineTitle>
        </TimelineHeader>
        <TimelineContent className="px-0 sm:pl-6">
          <TimelineDescription className="mb-2 line-clamp-3 max-w-full text-ellipsis break-words md:pl-6 md:text-base">
            {item.description}
          </TimelineDescription>

          <div className="mt-2 flex flex-wrap items-center gap-2 pb-3 md:mt-4 md:gap-3 md:pb-5 md:pl-6">
            {item?.tags?.map((t: any) => <Tag key={t} title={t} icon={null} />)}
          </div>

          <Link
            title={`Go to blog ${item.title}`}
            href={r(ROUTE_PATH.BLOG.DETAIL, { id: item.slug })}
            className="flex cursor-pointer items-center gap-x-1 md:pl-6"
          >
            <span className="text-sm font-bold text-primary md:text-base">
              {t("readMore")}
            </span>
            <IconChevronRight className="h-3 w-3 stroke-primary md:h-4 md:w-4" />
          </Link>
        </TimelineContent>
      </TimelineItem>
    </BaseAnimation>
  );
}
