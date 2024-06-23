import { CarouselItem } from "@/components/ui/carousel";
import { motion, useInView } from "framer-motion";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useRef } from "react";
interface Props {
  banner: string | StaticImport;
}

export default function BannerCarousel({ banner }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <CarouselItem
      ref={ref}
      className="flex flex-col items-center justify-center"
    >
      <motion.div
        className="relative h-[350px] w-full sm:h-[600px] md:h-[550px]"
        style={{
          transform: isInView ? "none" : "translateY(50px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.45s ease-out 0.45s",
        }}
      >
        <Image src={banner} alt="banner" layout="fill" objectFit="contain" />
      </motion.div>
    </CarouselItem>
  );
}
