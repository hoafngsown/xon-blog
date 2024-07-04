import type { AddEditPostTypeRequest } from "@/libs/schema/post.schema";
import { PostRepository } from "@/repository/posts.repo";
import { NextResponse } from "next/server";

interface Params {
  id: number;
}

export async function GET(request: Request, context: { params: Params }) {
  const id = context.params.id;
  const post = await PostRepository.getById(String(id));

  if (!post)
    return NextResponse.json(
      { message: "Bài viết không tồn tại" },
      { status: 404 },
    );

  return NextResponse.json(post, { status: 200 });
}

export async function PATCH(request: Request, context: { params: Params }) {
  const id = context.params.id;

  const body: AddEditPostTypeRequest = await request.json();

  const updatedCategory = await PostRepository.editById(String(id), body);

  return NextResponse.json(updatedCategory, { status: 200 });
}

export async function DELETE(request: Request, context: { params: Params }) {
  const id = context.params.id;

  const foundedPost = await PostRepository.getById(String(id));

  if (!foundedPost)
    return NextResponse.json(
      { message: "Bài viết không tồn tại" },
      { status: 404 },
    );

  await PostRepository.deleteById(String(id));

  return NextResponse.json({}, { status: 200 });
}
