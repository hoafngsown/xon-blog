import HomePageComponent from "@/components/pages/home/HomePage";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    title: t("title"),
    description: t("description"),
    icons: [{ rel: "icon", url: "/logo.png" }],
  } as Metadata;
}

export default async function HomePage() {
  return <HomePageComponent />;
}
