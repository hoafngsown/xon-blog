import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Props {
  currentSlide: number;
}

export default function BannerIntroduction({ currentSlide }: Props) {
  const t = useTranslations("page.home");

  const translationKey = `banner${currentSlide}`;

  return (
    <div
      className={cn(
        "absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center justify-center sm:bottom-full sm:left-[20%] sm:translate-y-full md:left-full md:-translate-x-full xl:bottom-0",
        {
          "xl:bottom-full xl:left-full ": [1, 5].includes(currentSlide),
          "xl:bottom-1/2": [2].includes(currentSlide),
          "xl:bottom-full xl:left-0 xl:translate-x-[20px] xl:translate-y-full":
            [3, 4].includes(currentSlide),
        },
      )}
    >
      <div
        className={cn(
          "relative flex h-[90px] w-[175px] translate-x-[50px] justify-center sm:h-[120px] sm:w-[225px] md:mb-2 md:w-[300px]",
        )}
      >
        <Image
          title="frame-chat-image"
          src="/images/frame-chat-2.png"
          alt="logo"
          objectFit="contain"
          layout="fill"
        />

        <p className="mb-4 flex flex-col items-center justify-center gap-y-0.5 text-xs font-medium text-title md:text-sm lg:text-base">
          <span>{t(`${translationKey}.title1`)}</span>
          <span>{t(`${translationKey}.title2`)}</span>
          <span>{t(`${translationKey}.title3`)}</span>
        </p>
      </div>

      <Image
        title="logo-image"
        className="z-20 h-20 w-20 rounded-[100%] bg-white sm:h-24 sm:w-24"
        src="/logo.png"
        alt="logo"
        width={80}
        height={80}
        objectFit="contain"
      />
    </div>
  );
}
