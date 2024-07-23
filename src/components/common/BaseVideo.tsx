import { cn } from "@/libs/utils";

export default function BaseVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <video
      width={1000}
      height={1000}
      loop
      controls
      className={cn(className, "h-full w-full rounded-[10px]")}
    >
      <source src={src} type="video/mp4" />
      <track src={src} kind="subtitles" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  );
}
