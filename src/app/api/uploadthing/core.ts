import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log({ metadata, file });
      return { uploadedBy: "Hoang Son" };
    },
  ),
  markdownUploader: f({
    "text/markdown": { maxFileSize: "8MB" },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log({ metadata, file });
    return { uploadedBy: "Hoang Son" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
