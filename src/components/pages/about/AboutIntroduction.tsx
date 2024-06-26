import Logo from "@/../public/logo.png";
import { cn } from "@/libs/utils";
import FrameChat2 from "@/statics/images/frame-chat-2.png";
import Image from "next/image";

interface Props {
  title: string;
}

export default function AboutIntroduction({ title }: Props) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center md:absolute md:bottom-1/2 md:left-3/4 md:translate-y-1/2 lg:bottom-full lg:translate-y-full",
      )}
    >
      <div
        className={cn(
          "absolute -top-[110%] left-[calc(50%+80px)] flex h-[100px] w-[175px] -translate-x-1/2 justify-center sm:w-[225px] md:-top-[125%] md:h-[125px] md:w-[300px]",
        )}
      >
        <Image src={FrameChat2} alt="logo" objectFit="contain" layout="fill" />

        <p className="text-title mb-4 flex flex-col items-center justify-center gap-y-0.5 text-xs font-medium md:text-sm lg:text-base">
          {title}
        </p>
      </div>

      <Image
        className="h-20 w-20 rounded-[100%] bg-white sm:h-24 sm:w-24"
        src={Logo}
        alt="logo"
        width={80}
        height={80}
        objectFit="contain"
      />
    </div>
  );
}
