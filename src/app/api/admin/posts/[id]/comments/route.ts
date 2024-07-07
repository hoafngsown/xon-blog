import { PostRepository } from "@/repository/posts.repo";
import type { CommentBodyType } from "@/types/comment";
import { NextResponse, type NextRequest } from "next/server";

type Params = {
  id: number;
};

export async function GET(request: NextRequest, context: { params: Params }) {
  const id = context.params.id;
  const post = await PostRepository.getById(String(id));

  if (!post)
    return NextResponse.json(
      { message: "Bài viết không tồn tại" },
      { status: 404 },
    );

  const comments = await PostRepository.getComments(String(id));

  return NextResponse.json(comments, { status: 200 });
}

export async function POST(request: NextRequest, context: { params: Params }) {
  const id = context.params.id;
  const post = await PostRepository.getById(String(id));

  if (!post)
    return NextResponse.json(
      { message: "Bài viết không tồn tại" },
      { status: 404 },
    );

  const body: CommentBodyType = await request.json();

  const newComment = await PostRepository.createComment(String(id), body);

  return NextResponse.json(newComment, { status: 200 });
}
