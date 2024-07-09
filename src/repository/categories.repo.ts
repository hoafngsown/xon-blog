import type { AddEditCategoryType } from "@/libs/schema/category.schema";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export class CategoryRepository {
  static async createNew(data: AddEditCategoryType) {
    try {
      const { name, slug } = data;

      const category = await db.category.create({
        data: {
          name,
          slug,
        },
      });

      return category;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async getAll() {
    try {
      const categories = await db.category.findMany();
      return categories;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async getById(id: string) {
    try {
      const category = await db.category.findFirst({
        where: { id: parseInt(id) },
      });

      return category;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async editById(id: string, body: AddEditCategoryType) {
    try {
      const data = {
        name: body.name,
        slug: body.slug,
      };

      const category = await db.category.update({
        where: { id: parseInt(id) },
        data: data,
      });

      return category;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async deleteById(id: string) {
    try {
      await db.$transaction(async (tx) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await tx.postCategory.deleteMany({
          where: { categoryId: parseInt(id) },
        });

        // Xóa danh mục
        return await tx.category.delete({
          where: { id: parseInt(id) },
        });
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
}
