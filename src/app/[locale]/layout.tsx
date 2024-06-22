import DefaultLayout from "@/components/layouts/DefaultLayout";
import { locales } from "@/configs/locale";
import { cn } from "@/libs/utils";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Hoàng Xơn space",
  description: "This site is my personal space",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

// const Nunito = localFont({
//   src: [
//     {
//       path: "../../../public/fonts/Nunito/Nunito-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../../../public/fonts/Nunito/Nunito-Italic.ttf",
//       weight: "400",
//       style: "italic",
//     },
//     {
//       path: "../../../public/fonts/Nunito/Nunito-Medium.ttf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../../../public/fonts/Nunito/Nunito-Bold.ttf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../../../public/fonts/Nunito/Nunito-BoldItalic.ttf",
//       weight: "700",
//       style: "italic",
//     },
//   ],
//   variable: "--font-nunito",
// });

const Courier = localFont({
  src: [
    {
      path: "../../../public/fonts/Courier/Courier-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Courier/Courier-BoldRegular.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-courier",
});

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
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "bg-background min-h-screen font-sans antialiased",
        Courier.variable,
      )}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <DefaultLayout params={{ locale }}>{children}</DefaultLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
