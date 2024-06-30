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
    <main className="relative h-full bg-background">
      <section className="flex min-h-full flex-col pb-[50px] md:pb-0">
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="block w-full md:hidden">
          <TopNavigation />
          <BottomNavigation />
        </div>

        <div className="container mx-auto mt-20 md:mt-[110px] md:px-20">
          {children}
        </div>
        <Footer />
      </section>

      <SocialSideBar />
    </main>
  );
}
