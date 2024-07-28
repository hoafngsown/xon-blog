import Image from "next/image";

export default function Empty({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-1 md:gap-y-2">
      <Image
        title="empty-image"
        src="/images/empty-box.png"
        alt="empty-box"
        className="h-[150px] w-[150px] md:h-[200px] md:w-[200px] lg:h-[250px] lg:w-[250px]"
      />
      <p className="text-center text-sm font-medium text-title md:text-base lg:text-lg">
        {message}
      </p>
    </div>
  );
}
