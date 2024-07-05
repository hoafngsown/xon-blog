import { getCompileMDX } from "@/libs/mdx";
import { db } from "@/server/db";
import type { CategoryMetaType } from "@/types/categories";
import type { PostMetaType } from "@/types/post";
import { formateDate } from "@/utils/date";
import { EPostStatus } from "@prisma/client";

export const postServerServices = {
  async getAllPostAndCategories() {
    const promises = [];

    promises[0] = db.post.findMany({
      where: {
        status: EPostStatus.Publish,
      },
      include: {
        categories: {
          include: {
            category: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        priority: "asc",
      },
    });

    promises[1] = db.category.findMany({
      include: {
        posts: true,
      },
    });

    const responses = await Promise.all(promises);

    const responsePost = (responses[0] ?? []) as any[];
    const responseCategories = (responses[1] ?? []) as any[];

    const formattedPosts: PostMetaType[] = responsePost?.map((post) => {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        slug: post.slug,
        tags: post.tags,
        publishAt: formateDate(post.publishAt),
      };
    });

    const formattedCategories: CategoryMetaType[] = responseCategories?.map(
      (ct) => {
        return {
          id: ct.id,
          name: ct.name,
          slug: ct.slug,
          totalPostCount: ct.posts.length,
        };
      },
    );

    return {
      posts: formattedPosts,
      categories: formattedCategories,
    };
  },
};

export async function formattedPost(post: any) {
  const response = await fetch(post.content);

  const source = await response.text();

  const { content } = await getCompileMDX(source);

  return {
    meta: {
      title: post.title,
      description: post.description,
      publishAt: post.publishAt,
      tags: post.tags,
      categories: post.categories,
    },
    content,
  };
}
