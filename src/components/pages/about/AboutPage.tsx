import Typography from "@/components/common/Typography";
import AboutIntroduction from "@/components/pages/about/AboutIntroduction";
import Banner1 from "@/statics/images/banner1.png";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
export default async function AboutPage() {
  const t = await getTranslations("page.about");

  return (
    <section className="relative mt-32 md:mt-20 lg:mt-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
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
          <Typography
            text={t("title")}
            className="mb:my-12 my-6 pt-6 text-center text-2xl sm:text-3xl md:mt-0 md:pt-6 md:text-4xl lg:pt-0"
          />
          <ul className="text-secondary my-6 flex list-disc flex-col gap-y-4 font-medium sm:gap-y-8 md:my-12 md:px-14 md:text-lg">
            <li>
              <p>
                {t("description1")}
                <span className="text-primary mx-1 font-bold underline">
                  {t("position1")}
                </span>
                {t("description2")}
                <span className="mx-1 font-bold text-red-500/90 underline">
                  {t("position2")}
                </span>
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
              <p>
                {t("description6")}
                <span className="text-primary mx-1 font-bold italic underline">
                  {t("quote")}
                </span>
                {t("description7")}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
