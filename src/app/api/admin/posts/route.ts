import type { AddEditPostTypeRequest } from "@/libs/schema/post.schema";
import { PostRepository } from "@/repository/posts.repo";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await PostRepository.getAll();

  return NextResponse.json(posts, { status: 200 });
}

export async function POST(request: Request) {
  const body: AddEditPostTypeRequest = await request.json();

  const newPost = await PostRepository.createNew(body);

  return NextResponse.json(newPost, { status: 200 });
}
