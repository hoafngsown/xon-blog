import { z } from "zod";

export const AddEditCategorySchema = z.object({
  id: z.number().nullish(),
  name: z.string().refine((val) => !!val, {
    message: "Bắt buộc nhập tên category",
  }),
  slug: z.string().refine((val) => !!val, {
    message: "Bắt buộc nhập slug",
  }),
});

export type AddEditCategoryType = z.TypeOf<typeof AddEditCategorySchema>;
