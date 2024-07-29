import {
  getAlternatesMetadata,
  getOpenGraphMetadata,
} from "@/app/shared-metadata";
import CategoryComponents from "@/components/pages/category/CategoryPage";
import envConfig from "@/configs/env";
import { postServerServices } from "@/services/server/posts.service";
import type { CategoryMetadataType } from "@/types/categories";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 86400;

export async function generateStaticParams() {
  const categories = await postServerServices.getCategoryMeta();

  return (
    categories.map((ct) => ({
      slug: ct.slug,
    })) ?? []
  );
}

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.category" });

  const category: CategoryMetadataType =
    await postServerServices.getCategoryBySlug(slug);

  const url = `${envConfig.SITE_URL}/${locale}/category/${slug}`;

  const title = t("title").replace("$$", category.name);
  const description = t("description").replace("$$", category.name);

  return {
    title,
    description,
    keywords: [category.name],
    icons: [{ rel: "icon", url: "/logo.png" }],
    openGraph: {
      ...getOpenGraphMetadata(locale),
      title: title,
      description: description,
      url,
      images: [
        {
          url: `/api/og?title=${title}&description=${description}`,
        },
      ],
    },
    canonical: url,
    alternates: getAlternatesMetadata(locale, url),
  } as Metadata;
}

export default async function CategoryDetailPage({ params: { slug } }: Props) {
  return <CategoryComponents slug={slug} />;
}
