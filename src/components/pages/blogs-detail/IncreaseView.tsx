"use client";

import { postServices } from "@/services/client/posts.service";
import { useEffect } from "react";

export default function IncreaseView({ postId }: { postId: number }) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(async () => {
      await postServices.increaseView(postId);
    }, 6000);
  }, [postId]);

  return <></>;
}
