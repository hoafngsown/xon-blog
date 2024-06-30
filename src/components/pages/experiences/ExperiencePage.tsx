import Breadcrumbs from "@/components/common/Breadcrumbs";
import { ROUTE_PATH } from "@/constants/routes";
import { type BreadcrumbType } from "@/types/common";
import { getTranslations } from "next-intl/server";
import ExperienceInfo from "./ExperienceInfo";
import ExperienceLifeTime from "./ExperienceLifeTime";
export default async function ExperiencesPage() {
  const t = await getTranslations();

  const BREAD_CRUMBS: BreadcrumbType[] = [
    {
      label: t("breadcrumbs.experiences.home"),
      url: ROUTE_PATH.HOME,
    },
    {
      label: t("breadcrumbs.experiences.experiences"),
      url: ROUTE_PATH.ABOUT,
    },
  ];

  return (
    <section className="relative mt-4 min-h-screen lg:mt-8">
      <div className="flex flex-col items-center justify-center pb-10 md:pb-20">
        <Breadcrumbs breadcrumbs={BREAD_CRUMBS} containerClassName="pb-28" />

        <ExperienceInfo />

        <ExperienceLifeTime />
      </div>
    </section>
  );
}
