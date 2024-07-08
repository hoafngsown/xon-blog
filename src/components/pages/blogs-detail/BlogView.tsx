/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { postServices } from "@/services/client/posts.service";
import { useEffect, useState } from "react";

export default function BlogView({ postId }: { postId: number }) {
  const [view, setView] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await postServices.getView(postId);
      setView(res);
    })();
  }, [postId]);

  return view;
}
