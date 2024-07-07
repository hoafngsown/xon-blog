import Logo from "@/../public/logo.png";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { ROUTE_PATH } from "@/constants/routes";
import { postServerServices } from "@/services/server/posts.service";
import type { BreadcrumbType } from "@/types/common";
import { formateDate } from "@/utils/date";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import BlogAuthorInfo from "./BlogAuthorInfo";
import { TableOfContents } from "./TableOfContent";
import { Link } from "@/navigation";
import { r } from "@/utils/route";

export default async function BlogDetailPage({ slug }: { slug: string }) {
  const post = await postServerServices.getPostBySlugAndExtractHeading(slug);

  const t = await getTranslations();

  const BREAD_CRUMBS: BreadcrumbType[] = [
    {
      label: t("breadcrumbs.blogsDetail.home"),
      url: ROUTE_PATH.HOME,
    },
    {
      label: t("breadcrumbs.blogsDetail.index"),
      url: ROUTE_PATH.BLOG.INDEX,
    },
    {
      label: post.title,
      url: "",
    },
  ];

  return (
    <section className="relative mt-4 min-h-screen lg:mt-8">
      <div className="relative flex flex-col items-center justify-center pb-10 pt-6 md:pb-20">
        <p className="absolute -top-0 left-0 flex w-fit cursor-pointer items-center gap-x-2 sm:text-base md:text-lg">
          <ChevronLeftIcon className="stroke-secondary sm:h-6 sm:w-6" />
          <span className="font-bold text-secondary">
            {t("page.blogsDetail.back")}
          </span>
        </p>

        <div className="flex flex-col items-center justify-center pt-2">
          <Breadcrumbs breadcrumbs={BREAD_CRUMBS} containerClassName="pb-6" />

          <div className="mt-4 grid grid-cols-12 lg:mt-8 lg:gap-x-8">
            <div className="col-span-12 hidden lg:col-span-4 lg:block xl:col-span-3">
              <TableOfContents headings={post.headings} />
            </div>

            <div className="col-span-12 lg:col-span-8 xl:col-span-9">
              <h1 className="text-2xl font-bold text-primary md:text-3xl">
                {post.title}
              </h1>

              <div className="mt-4 flex gap-x-2 lg:mt-6 lg:gap-x-3">
                <Image
                  src={Logo}
                  alt="logo"
                  className="h-12 w-12 rounded-full lg:h-14 lg:w-14"
                  objectFit="cover"
                />

                <p>
                  <span className="block text-lg font-bold text-sky-700 lg:text-xl">
                    Hoàng Sơn
                  </span>
                  <span className="block text-sm font-bold text-title lg:text-base">
                    Đăng ngày: {formateDate(post.publishAt)} - 20 lượt xem
                  </span>
                </p>
              </div>

              <div className="relative mx-auto mt-6 h-[350px] w-full overflow-hidden rounded-[10px] md:h-[500px] lg:mt-6 lg:h-[600px]">
                <Image
                  src={post.thumbnail}
                  alt="thumbail"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="mt-6 block lg:hidden">
                <TableOfContents headings={post.headings} />
              </div>

              <article
                id="blog-detail-section"
                className="break-words pb-6 text-lg leading-[2.25rem] sm:pb-10"
              >
                {post.content}

                <div className="flex items-center gap-x-4">
                  {post.tags.map((x, index) => (
                    <p
                      key={index}
                      className="cursor-pointer rounded-[10px] bg-primary px-2 py-1 text-sm font-bold text-white hover:bg-secondary"
                    >
                      {x}
                    </p>
                  ))}
                </div>
              </article>

              <div className="mb-6 flex gap-x-4 border-y border-solid border-y-[#ddd] py-4 font-bold text-title sm:pb-6 md:mb-10">
                Danh mục:{" "}
                <p className="flex items-center gap-x-2">
                  {post.categories.map((x: any, index) => (
                    <Link
                      key={index}
                      href={r(ROUTE_PATH.CATEGORY.SLUG, {
                        slug: x.category.slug,
                      })}
                      className="font-bold text-primary"
                    >
                      {x.category.name}{" "}
                      {post.categories.length - 1 !== index && ","}
                    </Link>
                  ))}
                </p>
              </div>

              <BlogAuthorInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
