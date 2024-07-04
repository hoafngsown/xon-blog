import type { PostType } from "./post";

export interface CommentType {
  id: number;
  name: string;
  email: string;
  content: string;
  website: string;

  replyToId: number | null;
  replyTo: CommentType;
  replies: CommentType[];

  postId: number;
  post: PostType;

  createdAt: Date;
  updatedAt: Date;
}
