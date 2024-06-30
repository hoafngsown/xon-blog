"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function BaseAnimation({
  children,
  // ...props
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 50 }}
      transition={{
        type: "tween",
        ease: [0.25, 0.25, 0.5, 0.75],
        duration: 1,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
