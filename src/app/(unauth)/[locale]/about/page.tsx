import { baseAlternates, baseOpenGraph } from "@/app/shared-metadata";
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
    icons: [{ rel: "icon", url: "/logo.png" }],
    openGraph: {
      ...baseOpenGraph,
      title: t("title"),
      description: t("description"),
      url,
      images: [
        {
          url: "/logo.png",
        },
      ],
    },
    alternates: {
      ...baseAlternates,
      canonical: url,
    },
  } as Metadata;
}

export default async function AboutPage() {
  return <AboutPageComponents />;
}
