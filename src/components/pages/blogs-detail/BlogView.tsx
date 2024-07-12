/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { postServices } from "@/services/client/posts.service";
import { useEffect, useState } from "react";

export default function BlogView({ postId }: { postId: number }) {
  const [view, setView] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const res = await postServices.getView(postId);
      setView(res);
    })();
  }, [postId]);

  return view === null ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin stroke-primary"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ) : (
    view
  );
}
