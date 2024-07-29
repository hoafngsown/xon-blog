import Breadcrumbs from "@/components/common/Breadcrumbs";
import Empty from "@/components/common/Empty";
import { ROUTE_PATH } from "@/constants/routes";
import { postServerServices } from "@/services/server/posts.service";
import { type BreadcrumbType } from "@/types/common";
import { getTranslations } from "next-intl/server";
import BlogsInfo from "./BlogInfo";
import BlogListPost from "./BlogListPost";

import BlogsCategories from "./BlogsCategories";

export const maxDuration = 50;
export const revalidate = 86400;

export default async function BlogsPage() {
  const { posts, categories, totalCount } =
    await postServerServices.getAllPostAndCategories();

  const t = await getTranslations();

  const BREAD_CRUMBS: BreadcrumbType[] = [
    {
      label: t("breadcrumbs.blogs.home"),
      url: ROUTE_PATH.HOME,
    },
    {
      label: t("breadcrumbs.blogs.index"),
      url: "",
    },
  ];

  return (
    <section className="relative mt-4 min-h-screen lg:mt-8">
      <div className="flex flex-col items-center justify-center pb-10 md:pb-20">
        <Breadcrumbs
          breadcrumbs={BREAD_CRUMBS}
          containerClassName="pb-28 md:pb-12"
        />

        <BlogsInfo />

        <div className="my-4 h-[1px] w-[50%] rounded-lg bg-[#ddd]/50 md:mb-5 md:mt-10" />

        <div className="mt-4 flex flex-col gap-y-4 sm:mt-8 sm:gap-y-8 lg:mt-10">
          <BlogsCategories
            categories={categories}
            totalCount={totalCount ? +totalCount : 0}
          />
          <BlogListPost posts={posts} />
          {posts.length === 0 && <Empty message={t("page.blogs.empty")} />}
        </div>
      </div>
    </section>
  );
}
