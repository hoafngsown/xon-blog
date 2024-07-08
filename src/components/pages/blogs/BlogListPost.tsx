import { Timeline } from "@/components/ui/timeline";
import { LocaleType } from "@/types/common";
import type { PostMetaType } from "@/types/post";
import { getLocale, getTranslations } from "next-intl/server";
import BlogPost from "./BlogPost";

export default async function BlogListPost({
  posts,
}: {
  posts: PostMetaType[];
}) {
  const t = await getTranslations("common");
  const locale = (await getLocale()) as LocaleType;

  return (
    <div className="mx-auto flex w-full md:max-w-2xl lg:max-w-[750px] xl:max-w-4xl">
      {posts && posts.length > 0 && (
        <Timeline className="mt-5 flex w-full flex-col px-0">
          {posts?.map((item, index) => (
            <BlogPost
              t={t}
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
