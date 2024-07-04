import envConfig from "@/configs/env";

/** @type {import('next-sitemap').IConfig} */
const nextSitemapConfig = {
  siteUrl: envConfig.SITE_URL ?? "https://www.hoangson.space",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};

export default nextSitemapConfig;
