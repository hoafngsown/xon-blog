"use client";

import { ROUTE_PATH } from "@/constants/routes";
import useIsCollapsed from "@/hooks/useIsCollapsed";
import { UserButton } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { Layout } from "../customs/layout";
import Sidebar from "../customs/sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  return (
    <div className="relative h-full overflow-hidden bg-white">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
      >
        <Layout>
          <Layout.Header className="mt-5 border-b border-b-[#ddd] md:mt-0">
            <UserButton
              afterSignOutUrl={ROUTE_PATH.AUTH.SIGNIN}
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-6",
                },
              }}
            />
          </Layout.Header>

          <Layout.Body>{children}</Layout.Body>
        </Layout>
      </main>
    </div>
  );
}
