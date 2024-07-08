import { CommentRepository } from "@/repository/comments.repo";
import { NextResponse } from "next/server";

interface Params {
  id: number;
}

export async function DELETE(request: Request, context: { params: Params }) {
  const id = context.params.id;

  const foundedComment = await CommentRepository.getById(String(id));

  if (!foundedComment)
    return NextResponse.json(
      { message: "Comment không tồn tại" },
      { status: 404 },
    );

  await CommentRepository.deleteById(String(id));

  return NextResponse.json({}, { status: 200 });
}
