import { ROUTE_PATH } from "@/constants/routes";
import { cn } from "@/libs/utils";
import { Link } from "@/navigation";
import type { PostType } from "@/types/post";
import { r } from "@/utils/route";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function RelatedPosts({
  posts,
}: {
  posts: Partial<PostType>[];
}) {
  const t = await getTranslations("page.blogsDetail.relatedPost");

  return (
    <div
      className={cn(
        "relative overflow-hidden border-t border-t-ddd bg-transparent pt-5 md:mt-5 lg:sticky lg:top-32",
      )}
    >
      <div className="flex flex-col gap-y-1.5 overflow-hidden px-0 transition-all md:mt-2">
        <p className="mb-3 text-xl font-bold text-primary md:mb-4 lg:text-2xl">
          {t("title")}
        </p>

        {posts?.map((item, index) => {
          return (
            <Link
              href={r(ROUTE_PATH.BLOG.DETAIL, { id: item.slug })}
              key={item.id}
              className={cn(
                "flex w-full gap-x-4 rounded-[10px] p-4 transition-all duration-300 hover:-translate-y-2 hover:bg-[#ddd]/50 dark:hover:bg-[#ddd]/30",
                {
                  "border-b border-dashed border-[#ddd]/50 pb-4":
                    index !== posts.length - 1,
                },
              )}
            >
              <div className="relative h-20 w-20 flex-shrink-0 rounded-[10px] md:h-24 md:w-24">
                <Image
                  src={item.thumbnail!}
                  alt="thumbnail"
                  layout="fill"
                  className="rounded-[10px]"
                />
              </div>

              <div className="flex flex-1 flex-col gap-y-1.5">
                <p className="line-clamp-1 text-base font-bold text-primary md:text-lg">
                  {item.title}
                </p>
                <p className="line-clamp-2 text-sm font-medium text-title md:text-base">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
