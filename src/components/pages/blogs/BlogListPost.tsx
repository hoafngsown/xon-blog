import { Timeline } from "@/components/ui/timeline";
import type { PostMetaType } from "@/types/post";
import BlogPost from "./BlogPost";
import { getLocale } from "next-intl/server";

export default async function BlogListPost({
  posts,
}: {
  posts: PostMetaType[];
}) {
  const locale = await getLocale();

  return (
    <div className="mx-auto flex w-full md:max-w-2xl lg:max-w-[750px] xl:max-w-4xl">
      {posts && posts.length > 0 && (
        <Timeline className="mt-5 flex w-full flex-col px-0">
          {posts?.map((item, index) => (
            <BlogPost
              key={item.title + index}
              item={item}
              isLast={index === posts.length - 1}
              locale={locale}
            />
          ))}
        </Timeline>
      )}
    </div>
  );
}
