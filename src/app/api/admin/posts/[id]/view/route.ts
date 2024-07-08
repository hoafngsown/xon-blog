import { PostRepository } from "@/repository/posts.repo";
import { NextResponse } from "next/server";

interface Params {
  id: number;
}

export async function PATCH(request: Request, context: { params: Params }) {
  const id = context.params.id;

  const updatedPost = await PostRepository.inCreaseView(String(id));

  return NextResponse.json(updatedPost, { status: 200 });
}

export async function GET(_request: Request, context: { params: Params }) {
  const id = context.params.id;

  const view = await PostRepository.getView(String(id));

  return NextResponse.json(view, { status: 200 });
}
