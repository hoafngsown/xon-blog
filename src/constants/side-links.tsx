import IconBookText from "@/components/icons/IconBookText";
import IconCategory from "@/components/icons/IconCategory";
import IconDashboard from "@/components/icons/IconDashboard";
import { ROUTE_PATH } from "./routes";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Trang chủ",
    label: "",
    href: ROUTE_PATH.ADMIN.INDEX,
    icon: <IconDashboard />,
  },
  {
    title: "Quản lý bài viết",
    label: "",
    href: ROUTE_PATH.ADMIN.POSTS.INDEX,
    icon: <IconBookText />,
  },
  {
    title: "Categories",
    label: "",
    href: ROUTE_PATH.ADMIN.CATEGORIES.INDEX,
    icon: <IconCategory />,
  },
  // {
  //   title: "Comments",
  //   label: "",
  //   href: ROUTE_PATH.ADMIN.COMMENTS.INDEX,
  //   icon: <IconComment />,
  // },
  // {
  //   title: "Blogs",
  //   label: "",
  //   href: ROUTE_PATH.ADMIN.BLOGS.INDEX,
  //   icon: <IconNote />,
  // },
];
