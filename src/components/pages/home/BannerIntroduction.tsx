import Logo from "@/../public/logo.png";
import { cn } from "@/libs/utils";
import FrameChat2 from "@/statics/images/frame-chat-2.png";
import FrameChat3 from "@/statics/images/frame-chat-3.png";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

import { motion } from "framer-motion";
interface Props {
  currentSlide: number;
}
export default function BannerIntroduction({ currentSlide }: Props) {
  const ref = useRef(null);
  const refAvatar = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isInViewAvatar = useInView(refAvatar, { once: true });

  const t = useTranslations("page.home");

  const getFrameChat = () => {
    if ([1, 2, 4, 5].includes(currentSlide)) return FrameChat2;
    if ([3].includes(currentSlide)) return FrameChat3;
    return FrameChat2;
  };

  const translationKey = `banner${currentSlide}`;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center justify-center sm:bottom-full sm:left-[20%] sm:translate-y-full md:left-full md:-translate-x-full xl:bottom-0",
        {
          "xl:bottom-full xl:left-full ": [1, 4].includes(currentSlide),
          "xl:bottom-1/2": [2, 5].includes(currentSlide),
          "xl:bottom-full xl:left-0 xl:translate-x-[20px] xl:translate-y-full":
            currentSlide === 3,
        },
      )}
    >
      <motion.div
        className={cn(
          "relative flex h-[100px] w-[175px] justify-center sm:h-[125px] sm:w-[225px] md:w-[300px]",
        )}
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.35s ease 0.35s",
        }}
      >
        <Image
          src={getFrameChat()}
          alt="logo"
          objectFit="contain"
          layout="fill"
        />

        <p className="text-title mb-4 flex flex-col items-center justify-center gap-y-0.5 text-xs font-medium md:text-sm lg:text-base">
          <span>{t(`${translationKey}.title1`)}</span>
          <span>{t(`${translationKey}.title2`)}</span>
          <span>{t(`${translationKey}.title3`)}</span>
        </p>
      </motion.div>

      <Image
        ref={refAvatar}
        className="z-20 h-20 w-20 rounded-[100%] bg-white sm:h-24 sm:w-24"
        src={Logo}
        alt="logo"
        width={80}
        height={80}
        objectFit="contain"
        style={{
          transform: isInViewAvatar ? "none" : "translateX(200px)",
          opacity: isInViewAvatar ? 1 : 0,
          transition: "all 0.35s ease 0.35s",
        }}
      />
    </div>
  );
}
