"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  type CarouselApi,
} from "@/components/ui/carousel";
import Banner from "@/statics/images/banner.png";
import Banner1 from "@/statics/images/banner1.png";
import Banner2 from "@/statics/images/banner2.png";
import Banner3 from "@/statics/images/banner3.png";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import BannerCarousel from "./BannerCarousel";
import BannerIntroduction from "./BannerIntroduction";

export default function HomePage() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrentSlide(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const keyPressEvent = (key: KeyboardEvent) => {
      if (key.code === "ArrowRight") {
        const slide = currentSlide === 4 ? 1 : currentSlide + 1;
        setCurrentSlide(slide);
        api.scrollTo(slide - 1);
      }

      if (key.code === "ArrowLeft") {
        const slide = currentSlide === 1 ? 4 : currentSlide - 1;
        setCurrentSlide(slide);
        api.scrollTo(slide - 1);
      }
    };

    window.addEventListener("keydown", keyPressEvent);

    return () => {
      window.removeEventListener("keydown", keyPressEvent);
    };
  });

  return (
    <main className="min-h-[70vh] sm:pt-6 md:pt-20">
      <section className="relative h-[550px] sm:h-[650px]">
        <Carousel
          className="relative w-full"
          setApi={setApi}
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {[Banner, Banner1, Banner2, Banner3].map((banner, index) => (
              <BannerCarousel banner={banner} key={index} />
            ))}
          </CarouselContent>

          <div className="fixed left-[10px] top-1/2 md:relative">
            <CarouselDots
              className="flex-col gap-y-4 md:mt-10 md:flex-row md:gap-x-2"
              activeClassName="w-2 h-5 md:w-6 md:h-2.5"
            />
          </div>
        </Carousel>

        <BannerIntroduction currentSlide={currentSlide || 1} />
      </section>
    </main>
  );
}
