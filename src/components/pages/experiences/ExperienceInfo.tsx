/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TextGenerateEffect } from "@/components/animations/TextGenerateEffect";
import { TypewriterEffectSmooth } from "@/components/animations/TypeWriterEffect";
import IntroductionFrame from "@/components/common/IntroductionFrame";
import { PDF_PATH } from "@/constants/paths";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function ExperienceInfo() {
  const t = await getTranslations();

  return (
    <>
      <div className="relative w-full">
        <IntroductionFrame className="md:bottom-0 md:translate-y-full">
          <div className="mt-0 flex flex-col items-center justify-center">
            <span>{t("page.experiences.introduction1")}</span>
            <span>{t("page.experiences.introduction2")}</span>

            <Link
              href={PDF_PATH.CV}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="cursor-pointer font-bold italic text-primary underline"
            >
              {t("page.experiences.introduction3")}
            </Link>
          </div>
        </IntroductionFrame>
      </div>

      <div>
        <TypewriterEffectSmooth
          className="mb:my-12 my-6 pt-6 md:mt-0 md:pt-6 lg:pt-0"
          words={t("page.experiences.title1")
            .split(" ")
            .map((x) => ({
              text: x,
              className: "text-2xl sm:text-3xl md:text-4xl",
            }))}
        />
      </div>

      <ul className="flex list-none flex-col items-center justify-center gap-y-1 text-sm font-medium text-secondary sm:gap-2 md:gap-3 md:text-base lg:gap-4">
        <li>
          <TextGenerateEffect
            words={t("page.experiences.description1")}
            wordClassName="text-base text-center"
          />
        </li>

        <li>
          <p className="text-center">{t("page.experiences.description2")}</p>
        </li>
      </ul>
    </>
  );
}
