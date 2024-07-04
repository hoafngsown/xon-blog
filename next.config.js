/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import nextIntl from "next-intl/plugin";
import withMDX from "@next/mdx";

const withNextIntl = nextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default withNextIntl(withMDX(nextConfig));
