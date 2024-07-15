import { baseAlternates, baseOpenGraph } from "@/app/shared-metadata";
import BlogComponents from "@/components/pages/blogs/BlogsPage";
import envConfig from "@/configs/env";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.blogs" });

  const url = `${envConfig.SITE_URL}/${locale}/blogs`;

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
          url: "/OGLogo.png",
        },
      ],
    },
    alternates: {
      ...baseAlternates,
      canonical: url,
    },
  } as Metadata;
}

export default async function BlogPage() {
  return <BlogComponents />;
}
