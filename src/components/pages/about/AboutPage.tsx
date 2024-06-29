import { TextHighlight } from "@/components/animations/TextHighlight";
import { TypewriterEffectSmooth } from "@/components/animations/TypeWriterEffect";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AboutIntroduction from "@/components/pages/about/AboutIntroduction";
import { ROUTE_PATH } from "@/constants/routes";
import Banner1 from "@/statics/images/banner1.png";
import { type BreadcrumbType } from "@/types/common";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const BREAD_CRUMBS: BreadcrumbType[] = [
  {
    label: "Trang chủ",
    url: ROUTE_PATH.HOME,
  },
  {
    label: "Về tui",
    url: ROUTE_PATH.ABOUT,
  },
];
export default async function AboutPage() {
  const t = await getTranslations("page.about");

  return (
    <section className="relative mt-4 lg:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
        <Breadcrumbs
          breadcrumbs={BREAD_CRUMBS}
          containerClassName="pb-28 md:pb-0 md:mb-10 lg:col-span-2 lg:mb-40"
        />

        <div className="relative">
          <AboutIntroduction title={t("introduction")} />
          <div className="relative hidden h-[350px] w-full md:block">
            <Image
              src={Banner1}
              alt="banner"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div>
          {/* <Typography text={t("title")} /> */}

          <TypewriterEffectSmooth
            className="mb:my-12 my-6 pt-6 md:mt-0 md:pt-6 lg:pt-0"
            words={t("title")
              .split(" ")
              .map((x) => ({
                text: x,
                className: "text-2xl sm:text-3xl md:text-4xl",
              }))}
          />
          <ul className="my-6 flex list-disc flex-col gap-y-4 font-medium text-secondary sm:gap-y-8 md:my-12 md:px-14 md:text-lg">
            <li className="leading-8">
              <p>
                {t("description1")}
                <TextHighlight className="mx-1">{t("position1")}</TextHighlight>
                {t("description2")}
                <TextHighlight className="mx-1 from-red-500 to-red-300/20">
                  {t("position2")}
                </TextHighlight>
                <span className="mx-1 font-bold text-red-500/90 underline"></span>
              </p>
            </li>

            <li>
              <p>{t("description3")}</p>
            </li>

            <li>
              <p>{t("description4")}</p>
            </li>

            <li>
              <p>{t("description5")}</p>
            </li>

            <li>
              <p>{t("description6")}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
