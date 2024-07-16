import { TextGenerateEffect } from "@/components/animations/TextGenerateEffect";
import { TypewriterEffectSmooth } from "@/components/animations/TypeWriterEffect";
import IntroductionFrame from "@/components/common/IntroductionFrame";
import PiggyBankImage from "@/statics/images/piggy-bank.png";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ContactInfo() {
  const t = await getTranslations();

  return (
    <>
      <div className="relative w-full">
        <IntroductionFrame className="md:bottom-0 md:translate-y-full">
          <div className="mt-0 flex flex-col items-center justify-center md:mt-5">
            <span>{t("page.contacts.introduction1")}</span>
            <span>{t("page.contacts.introduction2")}</span>
          </div>
        </IntroductionFrame>
      </div>

      <div>
        <TypewriterEffectSmooth
          className="mb:my-12 my-6 pt-6 md:mt-0 md:pt-6 lg:pt-0"
          words={t("page.contacts.title1")
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
            words="Techcombank: HOANGXOWN - (Phạm Hoàng Sơn)"
            wordClassName="text-base text-center"
          />
        </li>

        <li>
          <p className="text-center">{t("page.contacts.description1")}</p>
        </li>

        <li>
          <p className="text-center">{t("page.contacts.description2")}</p>
        </li>
        <li>
          <p className="text-center">{t("page.contacts.description3")}</p>
        </li>
        <li>
          <p className="text-center">{t("page.contacts.description4")}</p>
        </li>
      </ul>

      <div className="relative h-[150px] w-[150px] md:mt-6 md:h-[200px] md:w-[200px] lg:h-[250px] lg:w-[250px]">
        <Image
          title="contact-image"
          src={PiggyBankImage}
          alt="chill"
          className="sm:object-contain lg:object-cover"
          layout="fill"
        />
      </div>
    </>
  );
}
