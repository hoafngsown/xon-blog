import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } }).onUploadComplete(
    async () => {
      return { uploadedBy: "Hoang Son" };
    },
  ),
  markdownUploader: f({
    "text/markdown": { maxFileSize: "8MB" },
  }).onUploadComplete(async () => {
    return { uploadedBy: "Hoang Son" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
