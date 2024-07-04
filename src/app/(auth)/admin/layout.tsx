"use client";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAuth } from "@clerk/nextjs";

import { type ReactNode } from "react";

export default function AdminLayoutChildren({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) return null;

  return <AdminLayout>{children}</AdminLayout>;
}
