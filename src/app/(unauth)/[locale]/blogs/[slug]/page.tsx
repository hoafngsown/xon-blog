import BlogDetailPage from "@/components/pages/blogs-detail/BlogDetailPage";
import { postServerServices } from "@/services/server/posts.service";
import "@/styles/prism-dracula.css";
import type { PostType } from "@/types/post";
import type { Metadata } from "next";
import { useRouter } from "next/router";

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
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = (await postServerServices.getPostBySlug(slug)) as PostType;

  return {
    title: post.title,
    description: post.description,
    icons: [{ rel: "icon", url: "/logo.png" }],
  } as Metadata;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BlogDetail({ params: { slug } }: Props) {
  return <BlogDetailPage slug={slug} />;
}
