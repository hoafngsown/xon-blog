import BackgroundImage from "@/statics/images/background.png";
import Image from "next/image";
import React from "react";
import Header from "../common/Header";
import BottomNavigation from "../common/Navigation/BottomNavigation";
import TopNavigation from "../common/Navigation/TopNavigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <main className="relative min-h-screen bg-white">
      <section className="container mx-auto">
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="block w-full bg-red-500 md:hidden">
          <TopNavigation />
          <BottomNavigation />
        </div>

        <div className="mt-20 md:mt-0">{children}</div>
      </section>
      <Image
        src={BackgroundImage}
        alt="background-image"
        layout="fill"
        objectFit="cover"
        className="-z-10"
      />
    </main>
  );
}
