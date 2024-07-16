/* eslint-disable @typescript-eslint/no-unsafe-return */
export function getOpenGraphMetadata(locale: string) {
  const baseMetadata: any = {
    type: "website",
    siteName: "Phạm Hoàng Sơn",
  };

  const localeMetadata: any = {
    en: {
      locale: "en_US",
      titleTemplate: "%s | Productic",
      defaultTitle: "Productic",
    },
    vi: {
      locale: "vi_VN",
      titleTemplate: "%s | Productic",
      defaultTitle: "Productic",
    },
  };

  return {
    ...baseMetadata,
    ...localeMetadata[locale],
  };
}

/* eslint-disable @typescript-eslint/no-unsafe-return */
export function getAlternatesMetadata(locale: string, url?: string) {
  const baseMetadata: any = {
    canonical: url ?? "/",
  };

  const language: any = {
    vi: "/vi",
    en: "/en",
  };

  return {
    ...baseMetadata,
    language: { [locale]: language[locale] },
  };
}
