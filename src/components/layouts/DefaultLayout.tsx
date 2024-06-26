import BackgroundImage from "@/statics/images/background.png";
import Image from "next/image";
import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import BottomNavigation from "../common/Navigation/BottomNavigation";
import SocialSideBar from "../common/Navigation/SocialSideBar";
import TopNavigation from "../common/Navigation/TopNavigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <main className="bg-background relative h-full">
      <section className="flex h-full flex-col">
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="block w-full md:hidden">
          <TopNavigation />
          <BottomNavigation />
        </div>

        <div className="container mx-auto mt-20 md:mt-[110px]">{children}</div>
        <Footer />
      </section>

      <Image
        src={BackgroundImage}
        alt="background-image"
        layout="fill"
        objectFit="cover"
        className="-z-10"
      />

      <SocialSideBar />
    </main>
  );
}
