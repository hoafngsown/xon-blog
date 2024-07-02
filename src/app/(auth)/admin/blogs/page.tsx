"use client";

import { UploadButton } from "@/libs/uploadthing";

export default function BlogListPage() {
  return (
    <div>
      <UploadButton
        endpoint="markdownUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
