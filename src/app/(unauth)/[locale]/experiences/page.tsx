import { baseAlternates, baseOpenGraph } from "@/app/shared-metadata";
import ExperienceComponents from "@/components/pages/experiences/ExperiencePage";
import envConfig from "@/configs/env";
import type { Metadata } from "next";
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

  const url = `${envConfig.SITE_URL}/${locale}/contacts`;

  return {
    title: t("title"),
    description: t("description"),
    icons: [{ rel: "icon", url: "/logo.ico" }],
    openGraph: {
      ...baseOpenGraph,
      title: t("title"),
      description: t("description"),
      url,
      images: [
        {
          url: "https://utfs.io/f/ed939c2b-a7ac-4f87-9546-a84acb7bd204-h705nv.png",
        },
      ],
    },
    alternates: {
      ...baseAlternates,
      canonical: url,
    },
  } as Metadata;
}

export default async function ExperiencePage() {
  return <ExperienceComponents />;
}
