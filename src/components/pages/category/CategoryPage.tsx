import Breadcrumbs from "@/components/common/Breadcrumbs";
import { ROUTE_PATH } from "@/constants/routes";
import { postServerServices } from "@/services/server/posts.service";
import type { BreadcrumbType } from "@/types/common";
import { getTranslations } from "next-intl/server";
import BlogListPost from "../blogs/BlogListPost";
import BlogsCategories from "../blogs/BlogsCategories";
import CategoryInfo from "./CategoryInfo";
import Empty from "@/components/common/Empty";

export default async function CategoryPage({ slug }: { slug: string }) {
  const { posts, categories, category } =
    await postServerServices.getPostsByCategorySlug(slug);

  const t = await getTranslations();

  const BREAD_CRUMBS: BreadcrumbType[] = [
    {
      label: t("breadcrumbs.category.home"),
      url: ROUTE_PATH.HOME,
    },
    {
      label: t("breadcrumbs.category.index"),
      url: ROUTE_PATH.ABOUT,
    },
    {
      label: category.name,
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

        <CategoryInfo category={category} />

        <div className="my-4 h-[1px] w-[50%] rounded-lg bg-[#ddd]/50 md:mb-5 md:mt-10" />

        <div className="mt-4 flex flex-col gap-y-4 sm:mt-8 sm:gap-y-8 lg:mt-10">
          <BlogsCategories categories={categories} />
          <BlogListPost posts={posts} />
          {posts.length === 0 && (
            <Empty
              message={t("page.category.empty").replace("$$", category.name)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
