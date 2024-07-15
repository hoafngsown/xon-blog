import { baseAlternates, baseOpenGraph } from "@/app/shared-metadata";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { ThemeProvider } from "@/components/providers/theme";
import { Toaster } from "@/components/ui/toaster";
import { locales } from "@/configs/locale";
import { cn } from "@/libs/utils";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";

const Mali = localFont({
  src: [
    {
      path: "../../../../public/fonts/Mali/Mali-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Mali/Mali-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../../public/fonts/Mali/Mali-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Mali/Mali-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mali",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Hoàng Sơn",
    default: "Frontend Developer",
  },
  description: "This site is my personal space",
  openGraph: baseOpenGraph,
  alternates: baseAlternates,
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <html
        lang={locale}
        suppressHydrationWarning
        className={cn(
          "h-screen scroll-pt-[3.5rem] overflow-x-hidden bg-background font-sans antialiased",
          Mali.variable,
        )}
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <DefaultLayout>{children}</DefaultLayout>
          </ThemeProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
