/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales: string[] = ["vi", "en"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    messages: (await import(`../dictionaries/${locale}.json`)).default,
  };
});
