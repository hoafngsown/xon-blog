import type { AddEditImageType } from "@/libs/schema/image.schema";
import { ImageRepository } from "@/repository/images.repo";
import { NextResponse } from "next/server";

export async function GET() {
  const images = await ImageRepository.getAll();

  return NextResponse.json(images, { status: 200 });
}

export async function POST(request: Request) {
  const body: AddEditImageType = await request.json();

  const response = await ImageRepository.createNew(body);

  return NextResponse.json(response, { status: 200 });
}

export async function PATCH(request: Request) {
  const body: AddEditImageType = await request.json();

  const response = await ImageRepository.edit(body);

  return NextResponse.json(response, { status: 200 });
}
