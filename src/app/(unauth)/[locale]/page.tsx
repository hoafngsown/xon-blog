import { baseAlternates, baseOpenGraph } from "@/app/shared-metadata";
import HomePageComponent from "@/components/pages/home/HomePage";
import envConfig from "@/configs/env";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const url = `${envConfig.SITE_URL}/${locale}`;

  return {
    title: t("title"),
    keywords: ["Phạm Hoàng Sơn", "Góc của Sơn", "Hoàng Sơn space"],
    description: t("description"),
    icons: [{ rel: "icon", url: "/logo.ico" }],
    openGraph: {
      ...baseOpenGraph,
      title: t("title"),
      description: t("description"),
      url,
      images: [
        {
          url: "/logo.ico",
        },
      ],
    },
    alternates: {
      ...baseAlternates,
      canonical: url,
    },
  } as Metadata;
}

export default async function HomePage() {
  return <HomePageComponent />;
}
