import { CommentRepository } from "@/repository/comments.repo";
import { NextResponse } from "next/server";

export async function GET() {
  const comments = await CommentRepository.getAll();

  return NextResponse.json(comments, { status: 200 });
}

export async function POST(_: Request) {
  return NextResponse.json({ message: "Test hehe" }, { status: 200 });
}
