import IconComment from "@/components/icons/IconComment";
import IconDashboard from "@/components/icons/IconDashboard";
import IconNote from "@/components/icons/IconNote";
import IconTag from "@/components/icons/IconTag";
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
    title: "Tags",
    label: "",
    href: ROUTE_PATH.ADMIN.TAGS.INDEX,
    icon: <IconTag />,
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
