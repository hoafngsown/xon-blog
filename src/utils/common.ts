import GithubSlugger from "github-slugger";

export function convertTitleToSlug(title: string) {
  const slugger = new GithubSlugger();
  return slugger.slug(title);
}
