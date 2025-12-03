import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "es", "pt", "fr", "de", "zh"],

  // Used when no locale matches
  defaultLocale: "es",
  localePrefix: "always"
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|es|pt|fr|de|zh)/:path*"],
};
