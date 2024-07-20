/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TextGenerateEffect } from "@/components/animations/TextGenerateEffect";
import { TypewriterEffectSmooth } from "@/components/animations/TypeWriterEffect";
import IntroductionFrame from "@/components/common/IntroductionFrame";
import { getTranslations } from "next-intl/server";

export default async function LifeTimeInfo() {
  const t = await getTranslations();

  return (
    <>
      <div className="relative w-full">
        <IntroductionFrame className="md:bottom-0 md:translate-y-full">
          <div className="mt-0 flex flex-col items-center justify-center">
            <span>{t("page.lifetime.introduction1")}</span>
            <span>{t("page.lifetime.introduction2")}</span>
          </div>
        </IntroductionFrame>
      </div>

      <div>
        <TypewriterEffectSmooth
          className="mb:my-12 my-6 pt-6 md:mt-0 md:pt-6 lg:pt-0"
          words={t("page.lifetime.title1")
            .split(" ")
            .map((x) => ({
              text: x,
              className: "text-2xl sm:text-3xl md:text-4xl",
            }))}
        />
      </div>

      <p className="text-sm font-medium text-secondary md:text-base">
        <TextGenerateEffect
          words={t("page.lifetime.title2")}
          wordClassName="text-base text-center"
        />
      </p>
    </>
  );
}
