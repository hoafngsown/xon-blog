import type { MetadataRoute } from "next";
import envConfig from "@/configs/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/me/",
    },
    sitemap: `${envConfig.SITE_URL}/sitemap.xml`,
  };
}
