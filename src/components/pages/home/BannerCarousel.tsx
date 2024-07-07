import { CarouselItem } from "@/components/ui/carousel";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
interface Props {
  banner: string | StaticImport;
}

export default function BannerCarousel({ banner }: Props) {
  return (
    <CarouselItem className="flex flex-col items-center justify-center">
      <div className="relative h-[365px] w-full sm:h-[600px] md:h-[550px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          className="object-cover sm:object-contain"
        />
      </div>
    </CarouselItem>
  );
}
