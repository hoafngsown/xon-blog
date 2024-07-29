/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { db } from "@/server/db";
import { cache } from "react";

export const imageServerServices = {
  getAll: cache(async () => {
    const response = await db.image.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return response;
  }),
};
