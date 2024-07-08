import { CommentRepository } from "@/repository/comments.repo";
import { NextResponse } from "next/server";

export async function GET() {
  const comments = await CommentRepository.getAll();

  return NextResponse.json(comments, { status: 200 });
}
