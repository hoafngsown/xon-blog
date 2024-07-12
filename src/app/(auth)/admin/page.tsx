"use client";

import { useToast } from "@/components/ui/use-toast";
import { UploadButton } from "@/libs/uploadthing";

export default function AdminHomePage() {
  const { toast } = useToast();

  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          toast({
            title: "Đã upload ảnh thành công",
          });
        }}
        onUploadError={() => {
          toast({
            title: "Đã upload ảnh thành công",
            variant: "destructive",
          });
        }}
      />
    </div>
  );
}
