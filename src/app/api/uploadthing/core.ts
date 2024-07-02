import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
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
