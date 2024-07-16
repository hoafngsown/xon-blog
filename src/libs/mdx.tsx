/* eslint-disable  @typescript-eslint/prefer-string-starts-ends-with */
import { CopyToClipboard } from "@/components/common/Mdx/CopyToClipboard";
import MdxHeading from "@/components/common/Mdx/Heading";
import MdxVideo from "@/components/common/Mdx/Video";
import type { HeadingType } from "@/types/post";
import { convertTitleToSlug } from "@/utils/common";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import { cn } from "./utils";

export async function getCompileMDX(source: string) {
  const { content, frontmatter: formatter } = await compileMDX({
    source,
    components: {
      h1: (props) => <MdxHeading As="h1" {...props} />,
      h2: (props) => <MdxHeading As="h2" {...props} />,
      h3: (props) => <MdxHeading As="h3" {...props} />,
      h4: (props) => <MdxHeading As="h4" {...props} />,
      h5: (props) => <MdxHeading As="h5" {...props} />,
      h6: (props) => <MdxHeading As="h6" {...props} />,
      p: (props) => (
        <p
          {...props}
          className={cn(
            props.className,
            "my-2 font-medium text-secondary md:my-4 lg:my-5 xl:my-6",
          )}
        />
      ),
      ol: (props) => (
        <ol
          {...props}
          className={cn(
            props.className,
            "my-2 font-medium text-secondary md:my-4 lg:my-5 xl:my-6",
          )}
        />
      ),
      ul: (props) => (
        <ul
          {...props}
          className={cn(
            props.className,
            "my-2 list-disc font-medium text-secondary md:my-4 lg:my-5 xl:my-6",
          )}
        />
      ),
      figure: (props) => (
        <figure
          {...props}
          className={cn(
            props.className,
            "my-2 font-medium md:my-4 lg:my-5 xl:my-6",
          )}
        />
      ),
      li: (props) => (
        <li
          {...props}
          className={cn(
            props.className,
            "my-2 ml-12 font-medium md:my-4 lg:my-5 xl:my-6",
          )}
        />
      ),
      blockquote: (props) => (
        <blockquote
          {...props}
          className={cn(
            props.className,
            "relative my-[2.5rem] rounded-[10px] bg-[#ddd]/20 px-[1.5rem] py-0.5 text-center font-bold italic !text-title",
          )}
        >
          {props.children}
          <span className="absolute left-2 top-1 text-4xl text-title dark:text-secondary">
            &quot;
          </span>
          <span className="absolute -bottom-3 right-2 text-4xl text-title dark:text-secondary">
            &quot;
          </span>
        </blockquote>
      ),
      video: (props) => <MdxVideo id={props.id!} />,
      img: (props) => (
        <Image
          {...props}
          src={props.src!}
          width={650}
          height={650}
          title="parsed-mdx-image"
          alt="parsed-mdx-image"
          className={cn(
            props.className,
            "mx-auto my-2 h-auto w-full rounded-[10px] shadow-sm md:my-4 lg:my-5 xl:my-6",
          )}
          objectFit="cover"
        />
      ),
      pre: (props) => (
        <CopyToClipboard>
          <pre
            {...props}
            className={cn(props.className, "rounded-[10px] p-6")}
          />
        </CopyToClipboard>
      ),
      em: (props) => (
        <em {...props} className={cn(props.className, "font-bold")} />
      ),
      a: (props) => (
        <a
          {...props}
          className={cn(
            props.className,
            "rounded-[6px] border-b-2 border-primary font-bold italic text-secondary hover:border-b-[3px] hover:text-primary",
          )}
        />
      ),
      code: (props) => {
        return (
          <code
            {...props}
            className={cn(
              props.className,
              "bg-gradient-to-r from-purple-300 to-sky-500 bg-clip-text font-bold italic text-transparent",
            )}
          >
            {props.children}
          </code>
        );
      },
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [rehypeSlug, rehypePrism, rehypeCodeTitles],
      },
    },
  });

  return { content, frontmatter: formatter };
}

export function getHeadings(source: string): HeadingType[] {
  const headingLines = source.split("\n").filter((line) => {
    return line.match(/^###*\s/);
  });
  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "");
    const level = raw?.slice(0, 3) === "###" ? 3 : 2;
    return { text, level, slug: convertTitleToSlug(text) };
  });
}
