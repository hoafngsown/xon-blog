import { TypewriterEffectSmooth } from "@/components/animations/TypeWriterEffect";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { ROUTE_PATH } from "@/constants/routes";
import { type BreadcrumbType } from "@/types/common";
import { getTranslations } from "next-intl/server";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
export default async function ContactsPage() {
  const t = await getTranslations();

  const BREAD_CRUMBS: BreadcrumbType[] = [
    {
      label: t("breadcrumbs.contacts.home"),
      url: ROUTE_PATH.HOME,
    },
    {
      label: t("breadcrumbs.contacts.contacts"),
      url: ROUTE_PATH.ABOUT,
    },
  ];

  return (
    <section className="relative mt-4 min-h-screen lg:mt-8">
      <div className="flex flex-col items-center justify-center pb-10 md:pb-20">
        <Breadcrumbs breadcrumbs={BREAD_CRUMBS} containerClassName="pb-28" />

        <ContactInfo />

        <div className="my-4 h-[1px] w-[50%] rounded-lg bg-[#ddd]/50 md:my-10" />

        <div>
          <TypewriterEffectSmooth
            className="my-4 md:my-6 md:pt-6"
            words={t("page.contacts.title2")
              .split(" ")
              .map((x) => ({
                text: x,
                className: "text-2xl sm:text-3xl md:text-4xl",
              }))}
          />
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
