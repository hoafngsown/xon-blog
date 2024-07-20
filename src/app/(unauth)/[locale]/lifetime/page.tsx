import {
  getAlternatesMetadata,
  getOpenGraphMetadata,
} from "@/app/shared-metadata";
import LifeTimeComponents from "@/components/pages/lifetime/LifeTimePage";
import envConfig from "@/configs/env";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.lifetime" });

  const url = `${envConfig.SITE_URL}/${locale}/lifetime`;

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
    canonical: url,
    alternates: getAlternatesMetadata(locale, url),
  } as Metadata;
}

export default async function LifeTimePage() {
  return <LifeTimeComponents />;
}
