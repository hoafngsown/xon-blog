import type { AddEditCategoryType } from "@/libs/schema/category.schema";
import { CategoryRepository } from "@/repository/categories.repo";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await CategoryRepository.getAll();

  return NextResponse.json(categories, { status: 200 });
}

export async function POST(request: Request) {
  const body: AddEditCategoryType = await request.json();

  const newCategory = await CategoryRepository.createNew(body);

  return NextResponse.json(newCategory, { status: 200 });
}
