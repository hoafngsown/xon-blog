/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { getCompileMDX, getHeadings } from "@/libs/mdx";
import { db } from "@/server/db";
import type {
  CategoryMetaType,
  CategoryMetadataType,
  CategoryType,
} from "@/types/categories";
import type {
  HeadingType,
  PostMetaType,
  PostMetadataType,
  PostType,
} from "@/types/post";
import { EPostStatus } from "@prisma/client";
import matter from "gray-matter";

import { cache } from "react";

export const postServerServices = {
  getAllPostAndCategories: cache(async () => {
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

    const totalPostCount = await db.post.count();

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
        publishAt: post.publishAt,
        thumbnail: post.thumbnail,
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
      totalCount: totalPostCount,
    };
  }),

  getPostMeta: cache(async () => {
    const posts = await db.post.findMany({
      where: {
        status: EPostStatus.Publish,
      },
    });

    return posts.map((p) => ({
      title: p.title,
      description: p.description,
      slug: p.slug,
      id: p.id,
    })) as PostMetadataType[];
  }),

  getCategoryMeta: cache(async () => {
    const categories = await db.category.findMany();

    return categories.map((p) => ({
      name: p.name,
      slug: p.slug,
      id: p.id,
    })) as CategoryMetadataType[];
  }),

  getCategoryBySlug: cache(async (slug: string) => {
    const category = await db.category.findFirst({
      where: { slug },
    });

    return {
      name: category?.name,
      slug: category?.slug,
      id: category?.id,
    } as CategoryMetadataType;
  }),

  getPostBySlug: cache(async (slug: string) => {
    const post = await db.post.findFirst({
      where: {
        slug,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return post;
  }),

  getPostBySlugAndExtractHeading: cache(async (slug: string) => {
    const post = (await db.post.findFirst({
      where: {
        slug,
      },
      include: {
        categories: {
          include: {
            category: {
              select: {
                name: true,
                id: true,
                slug: true,
              },
            },
          },
        },
      },
    })) as any;

    const categoryIds = post.categories.map((p: any) => p.category.id);

    const relatedPosts = await db.post.findMany({
      where: {
        categories: {
          some: {
            categoryId: {
              in: categoryIds,
            },
          },
        },
        id: {
          not: post.id, // Exclude the current post
        },
      },
      select: {
        title: true,
        slug: true,
        id: true,
        description: true,
        thumbnail: true,
      },
      take: 5, // Limit to 5 related posts
    });

    const formattedPost = await formatPost(post);

    return { post: formattedPost, relatedPosts };
  }),

  getPostsByCategorySlug: cache(async (slug: string) => {
    const promises = [];

    promises[0] = db.category.findUnique({
      where: { slug },
      include: {
        posts: {
          include: {
            post: true,
          },
          where: {
            post: {
              status: EPostStatus.Publish,
            },
          },
          orderBy: {
            post: {
              priority: "asc",
            },
          },
        },
      },
    });

    promises[1] = db.category.findMany({
      include: {
        posts: true,
      },
    });

    const totalPostCount = await db.post.count();

    const responses = await Promise.all(promises);

    const category = (responses[0] ?? []) as any;
    const responseCategories = (responses[1] ?? []) as any[];

    const posts = (category ? category.posts : []).map(
      (postCategory: any) => postCategory.post,
    );

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

    const formattedPosts: PostMetaType[] = posts?.map((post: any) => {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        slug: post.slug,
        tags: post.tags,
        publishAt: post.publishAt ?? "",
        thumbnail: post.thumbnail,
      };
    });

    return {
      posts: formattedPosts,
      categories: formattedCategories,
      category: category as CategoryType,
      totalCount: totalPostCount,
    };
  }),
};

export async function formatPost(post: any) {
  const response = await fetch(post.content);

  const source = await response.text();

  const { content } = await getCompileMDX(source);

  const { content: contentForHeading } = matter(source);
  const headings = getHeadings(contentForHeading);

  return {
    ...post,
    content,
    headings,
  } as Omit<PostType, "content"> & {
    content: any;
    headings: HeadingType[];
  };
}
