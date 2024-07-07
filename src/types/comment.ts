import type { ECommentStatus } from "@prisma/client";
import type { PostType } from "./post";

export interface CommentType {
  id: number;
  name: string;
  email: string;
  content: string;
  website: string;

  replyToId: number | null;
  replyTo: CommentType;
  replies: Partial<CommentType>[];

  postId: number;
  post: PostType;

  createdAt: Date;
  updatedAt: Date;
  status: ECommentStatus;
}

export type CommentBodyType = Pick<
  CommentType,
  "name" | "email" | "content" | "website" | "replyToId" | "status"
>;
