import Logo from "@/../public/logo.png";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { ROUTE_PATH } from "@/constants/routes";
import { Link } from "@/navigation";
import { postServerServices } from "@/services/server/posts.service";
import type { BreadcrumbType, LocaleType } from "@/types/common";
import { formatDate } from "@/utils/date";
import { r } from "@/utils/route";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import BlogAuthorInfo from "./BlogAuthorInfo";
import BlogCommentList from "./BlogCommentList";
import BlogView from "./BlogView";
import ButtonBack from "./ButtonBack";
import ButtonScrollTop from "./ButtonScrollTop";
import IncreaseView from "./IncreaseView";
import RelatedPosts from "./RelatedPosts";
import { TableOfContents } from "./TableOfContent";

export default async function BlogDetailPage({ slug }: { slug: string }) {
  const { post, relatedPosts } =
    await postServerServices.getPostBySlugAndExtractHeading(slug);

  const t = await getTranslations();
  const locale = (await getLocale()) as LocaleType;

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
        <ButtonBack />

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
                  title="logo-image"
                  src={Logo}
                  alt="logo"
                  className="h-12 w-12 rounded-full lg:h-14 lg:w-14"
                  objectFit="cover"
                />

                <p>
                  <span className="block text-lg font-bold text-sky-700 lg:text-xl">
                    Hoàng Sơn
                  </span>
                  <p className="flex flex-wrap gap-x-2 text-sm font-bold text-title lg:text-base">
                    <span>{t("page.blogsDetail.publishAt")}:</span>
                    <span>{formatDate(post.publishAt, locale)}</span>-{" "}
                    <BlogView postId={post.id} /> {t("page.blogsDetail.view")}
                  </p>
                </p>
              </div>

              <div className="relative mx-auto mt-6 h-[350px] w-full overflow-hidden rounded-[10px] md:h-[500px] lg:mt-6 lg:h-[600px]">
                <Image
                  title="thumbnail-image"
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

              <div className="mb-6 flex gap-x-4 border-y border-solid border-y-ddd py-4 font-bold text-title sm:pb-6 md:mb-10">
                {t("page.blogsDetail.category")}:{" "}
                <p className="flex items-center gap-x-2">
                  {post.categories.map((x: any, index) => (
                    <Link
                      title={`Go to blog`}
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

            <div className="col-span-12 mt-4 grid grid-cols-12">
              <div className="hidden xl:col-span-3 xl:block" />
              <div className="col-span-12 xl:col-span-9">
                <RelatedPosts posts={relatedPosts} />
              </div>
            </div>
          </div>

          <div className="mt-2 grid w-full grid-cols-12 lg:gap-x-8">
            <div className="hidden xl:col-span-3 xl:block" />
            <div className="col-span-12 w-full xl:col-span-9">
              <BlogCommentList postId={post.id} />
            </div>
          </div>

          <IncreaseView postId={post.id} />
        </div>

        <ButtonScrollTop />
      </div>
    </section>
  );
}
