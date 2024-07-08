import { db } from "@/server/db";
import type { ECommentStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export class CommentRepository {
  static async getAll() {
    try {
      const comments = await db.comment.findMany({
        include: {
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return comments;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async getById(id: string) {
    try {
      const comment = await db.comment.findFirst({
        where: { id: parseInt(id) },
      });

      return comment;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async deleteById(id: string) {
    try {
      await db.comment.deleteMany({
        where: { replyToId: parseInt(id) },
      });

      await db.comment.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async changeStatus(id: string, status: ECommentStatus) {
    try {
      if (!id || !status) {
        return NextResponse.json(
          { error: "Invalid ID or status" },
          { status: 400 },
        );
      }

      const existingComment = await db.comment.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingComment) {
        return NextResponse.json(
          { error: "Comment not found" },
          { status: 404 },
        );
      }

      const updatedComment = await db.comment.update({
        where: { id: parseInt(id) },
        data: {
          status,
        },
      });

      return updatedComment;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
}
