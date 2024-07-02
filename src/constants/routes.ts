export const ROUTE_PATH = {
  HOME: "/",
  BLOG: {
    INDEX: "/blogs",
    DETAIL: "/blogs/:id",
  },
  ABOUT: "/about",
  CONTACT: "/contacts",
  EXPERIENCES: "/experiences",
  ADMIN: {
    INDEX: "/admin",
    COMMENTS: {
      INDEX: "/admin/comments",
    },
    BLOGS: {
      INDEX: "/admin/blogs",
    },
    TAGS: {
      INDEX: "/admin/tags",
    },
  },
  AUTH: {
    SIGNIN: "/sign-in",
    SIGNUP: "/sign-up",
  },
};
