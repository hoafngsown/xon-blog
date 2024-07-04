import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { cn } from "./utils";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

export async function getCompileMDX(source: string) {
  const { content, frontmatter: formatter } = await compileMDX({
    source,
    components: {
      h1: (props) => (
        <h1
          {...props}
          className={cn(
            "text-base font-bold text-primary md:text-lg",
            props?.className,
          )}
        />
      ),
      h2: (props) => (
        <h2
          {...props}
          className={cn(
            "text-base font-bold text-primary md:text-lg",
            props?.className,
          )}
        />
      ),
      h3: (props) => (
        <h3
          {...props}
          className={cn(
            "text-sm font-bold text-primary md:text-base ",
            props?.className,
          )}
        />
      ),
      h4: (props) => (
        <h4
          {...props}
          className={cn(
            "text-sm font-bold text-primary md:text-base",
            props?.className,
          )}
        />
      ),
      h5: (props) => (
        <h5
          {...props}
          className={cn(
            "text-sm font-bold text-primary md:text-base ",
            props?.className,
          )}
        />
      ),
      h6: (props) => (
        <h5
          {...props}
          className={cn(
            "text-sm font-bold text-primary md:text-base",
            props?.className,
          )}
        />
      ),

      p: (props) => (
        <p {...props} className={cn(props.className, "text-secondary")} />
      ),
      span: (props) => (
        <span {...props} className={cn(props.className, "text-secondary")} />
      ),
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          //   rehypeAutolinkHeadings,
          //   behavior: "wrap",
        ],
      },
    },
  });
  return { content, frontmatter: formatter };
}
