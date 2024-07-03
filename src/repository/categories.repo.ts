import type { AddEditCategoryType } from "@/libs/schema/category.schema";
import { db } from "@/server/db";

export class CategoryRepository {
  static async createNew(data: AddEditCategoryType) {
    const { name, description, slug, thumbnail } = data;

    const category = await db.category.create({
      data: {
        name,
        description,
        slug,
        thumbnail,
      },
    });

    return category;
  }

  static async getAll() {
    const categories = await db.category.findMany();
    return categories;
  }

  static async getById(id: string) {
    const category = await db.category.findFirst({
      where: { id: parseInt(id) },
    });

    return category;
  }

  static async editById(id: string, body: AddEditCategoryType) {
    const data = {
      name: body.name,
      description: body.description,
      slug: body.slug,
      thumbnail: body.thumbnail,
    };

    const category = await db.category.update({
      where: { id: parseInt(id) },
      data: data,
    });

    return category;
  }

  static async deleteById(id: string) {
    await db.category.delete({ where: { id: parseInt(id) } });
  }
}
