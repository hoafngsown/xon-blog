import { cn } from "@/libs/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import localFont from "next/font/local";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin của Sơn",
  description: "Trang admin của Sơn, dùng để quản lý tài nguyên hệ thống.",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

const Mali = localFont({
  src: [
    {
      path: "../../../public/fonts/Mali/Mali-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Mali/Mali-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Mali/Mali-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Mali/Mali-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mali",
});

export default function AdminLayoutRoot({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#000000" },
        elements: {
          formButtonPrimary:
            "bg-black border border-black border-solid hover:bg-white hover:text-black",
          socialButtonsBlockButton:
            "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
          socialButtonsBlockButtonText: "font-semibold",
          formButtonReset:
            "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
          membersPageInviteButton:
            "bg-black border border-black border-solid hover:bg-white hover:text-black",
          card: "bg-[#fafafa]",
        },
      }}
    >
      <html
        lang="vi"
        suppressHydrationWarning
        className={cn(
          "h-screen overflow-x-hidden bg-background font-sans antialiased",
          Mali.variable,
        )}
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
