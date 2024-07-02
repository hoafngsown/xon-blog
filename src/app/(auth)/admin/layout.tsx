"use client";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAuth } from "@clerk/nextjs";

import { type ReactNode } from "react";

export default function AdminLayoutChildren({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoaded, userId, isSignedIn } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId || !isSignedIn) {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
