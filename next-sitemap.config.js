/** @type {import('next-sitemap').IConfig} */
const nextSitemapConfig = {
  siteUrl: process.env.SITE_URL ?? "https://www.hoangson.space",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};

export default nextSitemapConfig;
