/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { db } from "@/server/db";

export const imageServerServices = {
  async getAll() {
    const response = await db.image.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return response;
  },
};
