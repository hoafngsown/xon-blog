/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { db } from "@/server/db";
import type { ContactBodyType } from "@/types/contact";
import { NextResponse } from "next/server";

export class ContactRepository {
  static async getAll() {
    try {
      const contacts = await db.contact.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return contacts;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  static async create(body: ContactBodyType) {
    try {
      const contact = await db.contact.create({ data: body });
      return contact;
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
}
