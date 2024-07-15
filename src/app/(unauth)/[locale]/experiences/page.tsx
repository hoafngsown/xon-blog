import ExperienceComponents from "@/components/pages/experiences/ExperiencePage";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "metadata.experiences",
  });

  return {
    title: t("title"),
    description: t("description"),
    icons: [{ rel: "icon", url: "/logo.ico" }],
  } as Metadata;
}

export default async function ExperiencePage() {
  return <ExperienceComponents />;
}
