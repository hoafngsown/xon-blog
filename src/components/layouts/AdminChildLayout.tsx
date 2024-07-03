"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "../ui/button";

export default function AdminChildLayout({
  children,
  backUrl,
}: {
  children: ReactNode;
  backUrl?: string;
}) {
  const router = useRouter();

  const handleBack = () => {
    if (backUrl) router.push(backUrl);
    else router.back();
  };

  return (
    <>
      <Button
        variant="ghost"
        type="button"
        onClick={handleBack}
        className="mb-4 rounded-[10px] border border-[#ddd] px-4 py-1 hover:bg-[#ddd]/50"
      >
        Quay lại
      </Button>
      {children}
    </>
  );
}
