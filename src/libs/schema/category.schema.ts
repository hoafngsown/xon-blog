import { z } from "zod";

export const AddEditCategorySchema = z.object({
  id: z.number().nullish(),
  name: z.string().refine((val) => !!val, {
    message: "Bắt buộc nhập tên category",
  }),
  description: z.string().refine((val) => !!val, {
    message: "Bắt buộc nhập description",
  }),
  slug: z.string().refine((val) => !!val, {
    message: "Bắt buộc nhập slug",
  }),
  thumbnail: z.string().refine((val) => !!val, {
    message: "Bắt buộc nhập thumbnail",
  }),
});

export type AddEditCategoryType = z.TypeOf<typeof AddEditCategorySchema>;
