import { EPostStatus } from "@prisma/client";
import { z } from "zod";

export const AddEditPostSchema = z.object({
  id: z.number().nullish(),
  title: z.string().refine((val) => !!val, {
    message: "Bắt buộc nhập title",
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
  content: z.string().refine((val) => !!val, {
    message: "Bắt buộc nhập content",
  }),
  status: z.enum([EPostStatus.Draft, EPostStatus.Publish], {
    message: "Status không hợp lệ",
  }),
  categories: z
    .array(z.string())
    .min(1, { message: "Chọn ít nhất 1 category" }),
  tags: z.string().refine((val) => !!val, {
    message: "Bắt buộc nhập tag",
  }),
  publishAt: z.date().nullish(),
  priority: z.preprocess(Number, z.number()).default(0),
});

export const ChangeStatusPostSchema = z.object({
  status: z.enum([EPostStatus.Draft, EPostStatus.Publish], {
    message: "Status không hợp lệ",
  }),
});

export type AddEditPostType = z.TypeOf<typeof AddEditPostSchema>;
export type AddEditPostTypeRequest = Omit<AddEditPostType, "tags"> & {
  tags: string[];
};

export type ChangeStatusPostType = z.TypeOf<typeof ChangeStatusPostSchema>;
