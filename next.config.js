/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import nextIntl from "next-intl/plugin";

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
      {
        protocol: "https",
        hostname: "api.microlink.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default withNextIntl(nextConfig);
