import { postServerServices } from "@/services/server/posts.service";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const revalidate = 86400;

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
  const posts = await postServerServices.getAllPostMeta();

  return (
    <div>
      <article>{posts?.[0]?.content}</article>
    </div>
  );
}
