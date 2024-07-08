import type { ChangeStatusCommentType } from "@/libs/schema/comment.schema";
import { CommentRepository } from "@/repository/comments.repo";
import { NextResponse } from "next/server";

interface Params {
  id: number;
}

export async function PATCH(request: Request, context: { params: Params }) {
  const id = context.params.id;

  const { status }: ChangeStatusCommentType = await request.json();

  const updatedComment = await CommentRepository.changeStatus(
    String(id),
    status,
  );

  return NextResponse.json(updatedComment, { status: 200 });
}
