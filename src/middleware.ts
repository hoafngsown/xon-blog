/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["vi", "en"],
  defaultLocale: "vi",
});

const isProtectedRoute = createRouteMatcher(["/(auth)(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(vi|en)/:path*"],
};
