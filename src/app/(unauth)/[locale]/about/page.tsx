import {
  getAlternatesMetadata,
  getOpenGraphMetadata,
} from "@/app/shared-metadata";
import AboutPageComponents from "@/components/pages/about/AboutPage";
import envConfig from "@/configs/env";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.about" });

  const url = `${envConfig.SITE_URL}/${locale}/about`;

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
          url: `/api/og?title=${t("og.title")}&description=${t("og.description")}`,
        },
      ],
    },
    alternates: getAlternatesMetadata(locale),
  } as Metadata;
}

export default async function AboutPage() {
  return <AboutPageComponents />;
}
