"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function BaseAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 40 }}
      transition={{ ease: "easeInOut", duration: 0.5, bounce: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
