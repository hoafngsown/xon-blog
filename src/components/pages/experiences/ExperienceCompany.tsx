import BaseAnimation from "@/components/animations/BaseAnimation";
import { LinkPreview } from "@/components/animations/LinkPreview";
import { MovingBorderComponent } from "@/components/animations/MovingBorderComponent";
import { Timeline } from "@/components/ui/timeline";
import {
  type ExperienceItemType,
  type ExperienceProjectType,
} from "@/types/experiences";
import Image from "next/image";
import ExperienceProject from "./ExperienceProject";

interface Props {
  item: ExperienceItemType;
}
export default function ExperienceCompany({ item }: Props) {
  return (
    <BaseAnimation>
      <div>
        <div className="flex gap-x-3 md:gap-x-6">
          {!!item.previewLink ? (
            <LinkPreview url={item.previewLink} className="h-fit">
              <MovingBorderComponent containerClassName="relative h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-[10px] md:h-[75px] md:w-[75px]">
                {item.logo && (
                  <Image
                    src={item.logo}
                    alt="logo"
                    objectFit="cover"
                    layout="fill"
                  />
                )}
              </MovingBorderComponent>
            </LinkPreview>
          ) : (
            <MovingBorderComponent containerClassName="bg-white relative h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-[10px] md:h-[75px] md:w-[75px]">
              {item.logo && (
                <Image
                  src={item.logo}
                  alt="logo"
                  objectFit="cover"
                  layout="fill"
                />
              )}
            </MovingBorderComponent>
          )}

          <div className="flex flex-col gap-y-1.5 sm:gap-y-2 md:gap-y-4">
            <p className="text-xs font-bold text-secondary sm:text-sm md:text-base">
              {item.time}
            </p>
            <p className="text-sm font-bold md:text-base">
              <span className="text-base text-primary md:text-lg">
                {item.title}
              </span>
              <span className="text-title"> | </span>
              <span className="text-xs text-secondary md:text-sm">
                {item.subTitle}
              </span>
            </p>

            {item.description && (
              <p className="text-sm font-medium text-secondary md:text-base">
                {item.description}
              </p>
            )}

            {item.projects && item.projects.length > 0 && (
              <Timeline className="mt-3 px-0 lg:mt-5 lg:pl-20">
                {item.projects?.map((item: ExperienceProjectType, index) => (
                  <ExperienceProject key={item.title + index} item={item} />
                ))}
              </Timeline>
            )}
          </div>
        </div>
      </div>
    </BaseAnimation>
  );
}
