import envConfig from "@/configs/env";
import { type Metadata } from "next";

export const baseOpenGraph = {
  locale: "vi_VN",
  type: "website",
  siteName: "Phạm Hoàng Sơn",
};

export const baseAlternates = {
  canonical: "/",
  languages: {
    "vi-VN": "/vi",
    "en-US": "/en",
  },
};

export const metadata: Partial<Metadata> = {
  metadataBase: new URL(envConfig.SITE_URL),
  openGraph: baseOpenGraph,
  alternates: baseAlternates,
};
