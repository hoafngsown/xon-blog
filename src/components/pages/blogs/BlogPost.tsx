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
import type { PostMetaType } from "@/types/post";
import { r } from "@/utils/route";

interface Props {
  item: PostMetaType;
  isLast: boolean;
}

export default function BlogPost({ item, isLast }: Props) {
  return (
    <BaseAnimation>
      <TimelineItem
        className={cn("group w-full pb-8 md:pb-12", isLast && "!pb-0")}
      >
        <TimelineConnector className="hidden sm:block" />
        <TimelineHeader className="group-hover:bg-red5">
          <TimelineTime className="hidden w-24 break-words pl-4 lg:block lg:pl-4">
            {item.publishAt}
          </TimelineTime>
          <TimelineIcon className="hidden sm:block" />
          <TimelineTitle>
            <div className="flex flex-col gap-2">
              <span className="whitespace-normal text-nowrap text-xs font-semibold leading-none text-secondary md:text-sm lg:hidden">
                {item.publishAt}
              </span>

              <Link href={r(ROUTE_PATH.BLOG.DETAIL, { id: item.slug })}>
                <p className="flex items-center gap-x-2 text-base text-primary md:text-xl">
                  <span>{item.title}</span>
                </p>
              </Link>
            </div>
          </TimelineTitle>
        </TimelineHeader>
        <TimelineContent className="px-0 sm:pl-6">
          <TimelineDescription className="mb-2 line-clamp-3 max-w-full text-ellipsis break-words md:text-base">
            {item.description}
          </TimelineDescription>

          <div className="mt-2 flex flex-wrap items-center gap-2 pb-3 md:mt-4 md:gap-3">
            {item?.tags?.map((t: any) => <Tag key={t} title={t} icon={null} />)}
          </div>

          <Link
            href={r(ROUTE_PATH.BLOG.DETAIL, { id: item.slug })}
            className="flex cursor-pointer items-center gap-x-1"
          >
            <span className="text-sm font-bold text-primary md:text-base">
              Đọc thêm
            </span>
            <IconChevronRight className="h-3 w-3 stroke-primary md:h-4 md:w-4" />
          </Link>
        </TimelineContent>
      </TimelineItem>
    </BaseAnimation>
  );
}
