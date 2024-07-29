import { ParallaxAnimation } from "@/components/animations/ParallaxAnimation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { ROUTE_PATH } from "@/constants/routes";
import { imageServerServices } from "@/services/server/images.service";
import { type BreadcrumbType } from "@/types/common";
import type { ImageType } from "@/types/images";
import { getTranslations } from "next-intl/server";
import LifeTimeInfo from "./LifeTimeInfo";

export const revalidate = 86400;

export default async function LifeTimePage() {
  const t = await getTranslations();

  const images = await imageServerServices.getAll();

  const BREAD_CRUMBS: BreadcrumbType[] = [
    {
      label: t("breadcrumbs.lifetime.home"),
      url: ROUTE_PATH.HOME,
    },
    {
      label: t("breadcrumbs.lifetime.index"),
      url: ROUTE_PATH.LIFETIME,
    },
  ];

  return (
    <section className="relative mt-4 min-h-screen lg:mt-8">
      <div className="flex flex-col items-center justify-center pb-10 md:pb-20">
        <Breadcrumbs breadcrumbs={BREAD_CRUMBS} containerClassName="pb-28" />

        <LifeTimeInfo />

        <ParallaxAnimation
          className="mt-6 md:mt-10 lg:mt-14 xl:mt-20"
          images={images as ImageType[]}
        />
      </div>
    </section>
  );
}
