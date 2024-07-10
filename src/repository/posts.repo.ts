import type { AddEditPostTypeRequest } from "@/libs/schema/post.schema";
import { db } from "@/server/db";
import type { CommentBodyType } from "@/types/comment";
import { ECommentStatus, EPostStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export class PostRepository {
  static async createNew(data: AddEditPostTypeRequest) {
    try {
      let post;
      const {
        title,
        description,
        content,
        thumbnail,
        slug,
        status = EPostStatus.Draft,
        categories,
        tags,
        priority,
      } = data;

      await db.$transaction(async (tx) => {
        await tx.post.updateMany({
          where: {
            priority: {
              gte: priority,
            },
          },
          data: {
            priority: {
              increment: 1,
            },
          },
        });

        post = await tx.post.create({
          data: {
            title,
            description,
            content,
            thumbnail,
            slug,
            status,
            tags,
            publishAt: status === EPostStatus.Publish ? new Date() : null,
            priority,
            categories: {
              create: categories.map((categoryId: string) => ({
                categoryId: parseInt(categoryId),
              })),
            },
          },
        });
      });

      return post;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async getAll() {
    try {
      const posts = await db.post.findMany({
        include: {
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          priority: "asc",
        },
      });
      return posts;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async getById(id: string) {
    try {
      const post = await db.post.findUnique({
        where: { id: parseInt(id) },
        include: {
          categories: {
            select: {
              categoryId: true,
              postId: true,
            },
          },
        },
      });

      return post;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async editById(id: string, body: AddEditPostTypeRequest) {
    try {
      const existingPost = await db.post.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingPost) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      let updatedPost;

      const {
        title,
        description,
        content,
        thumbnail,
        slug,
        status,
        categories,
        tags,
        priority,
      } = body;

      let tempPriority = priority;

      const totalPost = await db.post.count();

      // Update priorities of existing posts
      await db.$transaction(async (tx) => {
        if (priority < 0) tempPriority = 0;

        if (priority >= totalPost) tempPriority = totalPost - 1;

        if (tempPriority !== existingPost.priority) {
          if (tempPriority > existingPost.priority) {
            await tx.post.updateMany({
              where: {
                priority: {
                  gt: existingPost.priority,
                  lte: tempPriority,
                },
              },
              data: {
                priority: {
                  decrement: 1,
                },
              },
            });
          } else {
            await tx.post.updateMany({
              where: {
                priority: {
                  lt: existingPost.priority,
                  gte: tempPriority,
                },
              },
              data: {
                priority: {
                  increment: 1,
                },
              },
            });
          }
        }

        updatedPost = await tx.post.update({
          where: { id: parseInt(id) },
          data: {
            title,
            description,
            content,
            thumbnail,
            slug,
            status,
            priority: tempPriority, // Sử dụng giá trị priority từ request
            tags,
            categories: {
              deleteMany: {},
              create: categories.map((categoryId: string) => ({
                categoryId: parseInt(categoryId),
              })),
            },
          },
        });
      });

      return updatedPost;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async deleteById(id: string) {
    try {
      await db.$transaction(async (tx) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await tx.postCategory.deleteMany({
          where: { postId: parseInt(id) },
        });

        // Xóa bài viết
        return await tx.post.delete({
          where: { id: parseInt(id) },
        });
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async changeStatus(id: string, status: EPostStatus) {
    try {
      if (!id || !status) {
        return NextResponse.json(
          { error: "Invalid ID or status" },
          { status: 400 },
        );
      }

      const existingPost = await db.post.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingPost) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      let publishAt = existingPost.publishAt;

      if (status === EPostStatus.Publish) {
        publishAt = new Date();
      } else if (status === EPostStatus.Draft) {
        publishAt = null;
      } else {
        return NextResponse.json(
          { error: "Invalid status value" },
          { status: 400 },
        );
      }

      const updatedPost = await db.post.update({
        where: { id: parseInt(id) },
        data: {
          status,
          publishAt,
        },
      });

      return updatedPost;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async getComments(id: string) {
    try {
      const comments = await db.comment.findMany({
        where: { postId: parseInt(id), status: ECommentStatus.Approved },
        include: {
          replies: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      function organizeComments(comments: any[], parentId = null): any {
        return comments
          .filter(
            (comment: { replyToId: null }) => comment.replyToId === parentId,
          )
          .map((comment: { id: null | undefined }) => ({
            ...comment,
            replies: organizeComments(comments, comment.id),
          }));
      }

      const organizedComments: any = organizeComments(comments);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return organizedComments;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async createComment(postId: string, body: CommentBodyType) {
    const { name, email, content, website, replyToId, status } = body;

    try {
      const newComment = await db.comment.create({
        data: {
          name,
          email,
          content,
          website,
          replyToId: replyToId ? parseInt(replyToId + "") : null,
          postId: parseInt(postId),
          status,
        },
      });

      return newComment;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async inCreaseView(id: string) {
    try {
      if (!id) {
        return NextResponse.json(
          { error: "Invalid ID or status" },
          { status: 400 },
        );
      }

      const existingPost = await db.post.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingPost) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      const updatedPost = await db.post.update({
        where: { id: parseInt(id) },
        data: {
          view: {
            increment: 1,
          },
        },
      });

      return updatedPost;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async getView(id: string) {
    try {
      if (!id) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }

      const post = await db.post.findFirst({
        where: { id: parseInt(id) },
        select: {
          view: true,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return post?.view ?? 0;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
}
