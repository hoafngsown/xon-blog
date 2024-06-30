import BaseAnimation from "@/components/animations/BaseAnimation";
import Tag from "@/components/common/Tag";
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
import { type ExperienceProjectType } from "@/types/experiences";

interface Props {
  item: ExperienceProjectType;
}

export default function ExperienceProject({ item }: Props) {
  return (
    <BaseAnimation>
      <TimelineItem>
        <TimelineConnector />
        <TimelineHeader>
          <TimelineTime className="hidden w-24 break-words pl-4 lg:block lg:pl-4">
            {item.time}
          </TimelineTime>
          <TimelineIcon />
          <TimelineTitle>
            <div className="flex flex-col gap-2 md:gap-4">
              <p className="flex items-center gap-x-2 text-base md:text-lg">
                <span>{item.title}</span>
                <span> | </span>
                <span className="text-xs text-secondary md:text-sm">
                  {item.subTitle}
                </span>
              </p>

              <span className="whitespace-normal text-nowrap text-xs font-semibold leading-none text-secondary md:text-sm lg:hidden">
                {item.time}
              </span>
            </div>
          </TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          <TimelineDescription className="md:text-base">
            {item.description}
          </TimelineDescription>

          <div className="mt-2 flex flex-wrap items-center gap-2 pb-4 md:mt-4 md:gap-3 md:pb-2">
            {item.tags?.map((t) => (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              <Tag
                key={t.title}
                title={t.title}
                icon={
                  t.icon ? (
                    <t.icon className="flex h-4 w-4 items-center justify-center md:h-5 md:w-5" />
                  ) : null
                }
              />
            ))}
          </div>
        </TimelineContent>
      </TimelineItem>
    </BaseAnimation>
  );
}
