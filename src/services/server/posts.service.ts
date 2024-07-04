import { getCompileMDX } from "@/libs/mdx";
import { db } from "@/server/db";
import { EPostStatus, type Post } from "@prisma/client";

export const postServerServices = {
  async getAllPostMeta() {
    try {
      const posts: Post[] = await db.post.findMany({
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

      const formattedPosts = [];

      for (const post of posts) {
        const formattedBlog = await formattedPost(post);
        if (post) {
          formattedPosts.push(formattedBlog);
        }
      }

      return formattedPosts;
    } catch (error) {
      console.log("Some thing went wrong");
    }
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
