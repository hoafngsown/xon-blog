import AboutPageComponents from "@/components/pages/about/AboutPage";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
    icons: [{ rel: "icon", url: "/logo.ico" }],
  } as Metadata;
}

export default async function AboutPage() {
  return <AboutPageComponents />;
}
