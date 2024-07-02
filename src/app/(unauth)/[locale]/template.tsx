"use client";

import BaseAnimation from "@/components/animations/BaseAnimation";
import { AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <BaseAnimation>{children}</BaseAnimation>
    </AnimatePresence>
  );
}
