import { ROUTE_PATH } from "@/constants/routes";
import type { CategoryMetaType } from "@/types/categories";
import BlogTag from "./BlogTag";
import { Link } from "@/navigation";

export default function BlogsCategories({
  categories,
}: {
  categories: CategoryMetaType[];
}) {
  const totalPost = categories.reduce((total, cur) => {
    return (total += cur.totalPostCount);
  }, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <Link href={ROUTE_PATH.BLOG.INDEX}>
          <BlogTag slug="">
            <span className="text-sm md:text-base">All</span>
            <span className="text-xs md:text-sm">({totalPost})</span>
          </BlogTag>
        </Link>
        {categories.map((ct) => (
          <Link key={ct.id} href={`${ROUTE_PATH.CATEGORY.INDEX}/${ct.slug}`}>
            <BlogTag slug={ct.slug}>
              <span className="text-sm md:text-base">{ct.name}</span>
              <span className="text-xs md:text-sm">({ct.totalPostCount})</span>
            </BlogTag>
          </Link>
        ))}
      </div>
    </div>
  );
}
