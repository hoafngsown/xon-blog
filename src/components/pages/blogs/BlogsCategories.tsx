import { ROUTE_PATH } from "@/constants/routes";
import { Link } from "@/navigation";
import type { CategoryMetaType } from "@/types/categories";
import BlogTag from "./BlogTag";

export default function BlogsCategories({
  categories,
  totalCount,
}: {
  categories: CategoryMetaType[];
  totalCount: number;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <Link href={ROUTE_PATH.BLOG.INDEX}>
          <BlogTag slug="">
            <span className="text-sm md:text-base">All</span>
            <span className="text-xs md:text-sm">({totalCount})</span>
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
