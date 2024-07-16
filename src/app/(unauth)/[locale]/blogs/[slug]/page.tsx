import {
  getAlternatesMetadata,
  getOpenGraphMetadata,
} from "@/app/shared-metadata";
import BlogDetailPage from "@/components/pages/blogs-detail/BlogDetailPage";
import envConfig from "@/configs/env";
import { postServerServices } from "@/services/server/posts.service";
import "@/styles/prism-dracula.css";
import type { PostType } from "@/types/post";
import type { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await postServerServices.getPostMeta();

  return (
    posts.map((post) => ({
      slug: post.slug,
    })) ?? []
  );
}

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  const post = (await postServerServices.getPostBySlug(
    slug,
  )) as unknown as PostType;
  const url = `${envConfig.SITE_URL}/${locale}/blogs/${slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "Hoàng Sơn", url: envConfig.SITE_URL }],
    keywords: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      ...post.categories.map((x: any) => x.category.name),
      ...post.tags,
    ],
    icons: [{ rel: "icon", url: "/logo.png" }],
    openGraph: {
      ...getOpenGraphMetadata(locale),
      title: post.title,
      description: post.description,
      url,
      images: [
        {
          url: post.thumbnail,
        },
      ],
    },
    alternates: getAlternatesMetadata(locale),
  } as Metadata;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BlogDetail({ params: { slug } }: Props) {
  return <BlogDetailPage slug={slug} />;
}
