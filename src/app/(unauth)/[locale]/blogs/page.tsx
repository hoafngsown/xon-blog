import BlogComponents from "@/components/pages/blogs/BlogsPage";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.blogs" });

  return {
    title: t("title"),
    description: t("description"),
    icons: [{ rel: "icon", url: "/logo.png" }],
  } as Metadata;
}

export default async function BlogPage() {
  return <BlogComponents />;
}
