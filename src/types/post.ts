import type { EPostStatus } from "@prisma/client";
import type { CategoryType } from "./categories";
import type { CommentType } from "./comment";

export interface PostType {
  id: number;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  slug: string;

  status: EPostStatus;
  publishAt: Date;

  categories: CategoryType[];
  tags: string[];

  comments: CommentType[];

  createdAt: Date;
  updatedAt: Date;
  priority: number;
}
