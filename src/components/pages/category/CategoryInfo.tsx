import { TextGenerateEffect } from "@/components/animations/TextGenerateEffect";
import { TypewriterEffectSmooth } from "@/components/animations/TypeWriterEffect";
import IntroductionFrame from "@/components/common/IntroductionFrame";
import type { CategoryType } from "@/types/categories";
import { getTranslations } from "next-intl/server";

export default async function CategoryInfo({
  category,
}: {
  category: CategoryType;
}) {
  const t = await getTranslations();

  return (
    <>
      <div className="relative w-full">
        <IntroductionFrame className="md:bottom-0 md:translate-y-full">
          <div className="mt-0 flex flex-col items-center justify-center md:mt-5">
            <span>{t("page.category.introduction1")}</span>
            <span>
              {t("page.category.introduction2").replace("$$", category.name)}
            </span>
          </div>
        </IntroductionFrame>
      </div>

      <div>
        <TypewriterEffectSmooth
          className="mb-0 mt-2 pt-6 md:mt-6 md:pt-6 lg:pt-0"
          words={t("page.blogs.title1")
            .replace("$$", category.name)
            .split(" ")
            .map((x) => ({
              text: x,
              className: "text-2xl sm:text-3xl md:text-4xl",
            }))}
        />
      </div>

      <div>
        <TextGenerateEffect
          words={t("page.blogs.title2")}
          wordClassName="text-base text-center"
        />
      </div>
    </>
  );
}
