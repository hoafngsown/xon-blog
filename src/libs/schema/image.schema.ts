import { MediaType } from "@prisma/client";
import { z } from "zod";

export const AddEditImageItemSchema = z.object({
  id: z.number().nullish(),
  url: z.any(),
  text: z.string().nullish(),
  type: z.enum([MediaType.Image, MediaType.Video]),
});
export const AddEditImageSchema = z.object({
  data: z.array(AddEditImageItemSchema),
});

export type AddEditImageType = z.TypeOf<typeof AddEditImageSchema>;
export type AddEditImageItemType = z.TypeOf<typeof AddEditImageItemSchema>;
