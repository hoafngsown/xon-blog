"use client";
import { cn } from "@/libs/utils";
import type { ImageType } from "@/types/images";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DirectionAwareHover } from "./DirectionAwareHoverAnimation";

export const ParallaxAnimation = ({
  images,
  className,
}: {
  images: ImageType[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  const getImageComponents = (el: ImageType) => {
    return (
      <DirectionAwareHover imageUrl={el.url}>
        <p className="text-xl font-bold text-white">{el.text}</p>
      </DirectionAwareHover>
    );
  };

  return (
    <div
      className={cn("h-[45rem] w-full items-start overflow-y-auto", className)}
      ref={gridRef}
    >
      <div
        className="mx-auto grid w-full grid-cols-1 items-start gap-10 md:grid-cols-2 lg:grid-cols-3"
        ref={gridRef}
      >
        <div className="flex flex-col gap-10">
          {firstPart.map((el, idx) => (
            <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
              {getImageComponents(el)}
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              {getImageComponents(el)}
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              {getImageComponents(el)}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
