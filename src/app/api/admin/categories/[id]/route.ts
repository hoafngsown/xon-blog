import type { AddEditCategoryType } from "@/libs/schema/category.schema";
import { CategoryRepository } from "@/repository/categories.repo";
import { NextResponse } from "next/server";

interface GetDetailCategoryParams {
  id: number;
}

export async function GET(
  request: Request,
  context: { params: GetDetailCategoryParams },
) {
  const id = context.params.id;
  const category = await CategoryRepository.getById(String(id));

  return NextResponse.json(category, { status: 200 });
}

export async function PATCH(
  request: Request,
  context: { params: GetDetailCategoryParams },
) {
  const id = context.params.id;

  const foundedCategory = await CategoryRepository.getById(String(id));

  if (!foundedCategory) return NextResponse.json({}, { status: 400 });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: AddEditCategoryType = await request.json();

  const updatedCategory = await CategoryRepository.editById(String(id), body);

  return NextResponse.json(updatedCategory, { status: 200 });
}

export async function DELETE(
  request: Request,
  context: { params: GetDetailCategoryParams },
) {
  const id = context.params.id;

  const foundedCategory = await CategoryRepository.getById(String(id));

  if (!foundedCategory) return NextResponse.json({}, { status: 400 });

  await CategoryRepository.deleteById(String(id));

  return NextResponse.json({}, { status: 200 });
}
