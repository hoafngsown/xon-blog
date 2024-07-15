import { Metadata } from "next";

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

export const baseMetadata: Partial<Metadata> = {
  openGraph: baseOpenGraph,
  alternates: baseAlternates,
};
