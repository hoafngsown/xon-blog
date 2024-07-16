import {
  getAlternatesMetadata,
  getOpenGraphMetadata,
} from "@/app/shared-metadata";
import ContactComponents from "@/components/pages/contacts/ContactPage";
import envConfig from "@/configs/env";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.contacts" });

  const url = `${envConfig.SITE_URL}/${locale}/contacts`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    icons: [{ rel: "icon", url: "/logo.png" }],
    openGraph: {
      ...getOpenGraphMetadata(locale),
      title: t("title"),
      description: t("description"),
      url,
      images: [
        {
          url: `/api/og?title=${t("title")}&description=${t("description")}`,
        },
      ],
    },
    alternates: getAlternatesMetadata(locale),
  } as Metadata;
}

export default async function ContactPage() {
  return <ContactComponents />;
}
