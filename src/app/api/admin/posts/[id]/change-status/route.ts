import type { ChangeStatusPostType } from "@/libs/schema/post.schema";
import { PostRepository } from "@/repository/posts.repo";
import { NextResponse } from "next/server";

interface Params {
  id: number;
}

export async function PATCH(request: Request, context: { params: Params }) {
  const id = context.params.id;

  const { status }: ChangeStatusPostType = await request.json();

  const updatedCategory = await PostRepository.changeStatus(String(id), status);

  return NextResponse.json(updatedCategory, { status: 200 });
}
