import { ECommentStatus } from "@prisma/client";
import { z } from "zod";

export const ChangeStatusCommentSchema = z.object({
  status: z.enum([ECommentStatus.NotApprove, ECommentStatus.Approved], {
    message: "Status không hợp lệ",
  }),
});

export type ChangeStatusCommentType = z.TypeOf<
  typeof ChangeStatusCommentSchema
>;

export const ChangeOwnerCommentSchema = z.object({
  isOwner: z.boolean(),
});

export type ChangeOwnerCommentType = z.TypeOf<typeof ChangeOwnerCommentSchema>;
