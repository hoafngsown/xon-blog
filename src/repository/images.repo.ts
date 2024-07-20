/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { AddEditImageType } from "@/libs/schema/image.schema";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export class ImageRepository {
  static async createNew(data: AddEditImageType) {
    try {
      const newImages = await db.image.createMany({
        data: data.data.map((item) => ({
          url: item.url as string,
          text: item.text ?? "",
        })),
      });

      return newImages;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async edit(data: AddEditImageType) {
    try {
      await db.$transaction(async () => {
        await db.image.deleteMany();

        await db.image.createMany({
          data: data.data.map((item) => ({
            url: item.url as string,
            text: item.text ?? "",
          })),
        });
      });

      return [];
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async getAll() {
    try {
      const images = await db.image.findMany();
      return images;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
}
