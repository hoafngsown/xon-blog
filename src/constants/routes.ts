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
    CATEGORIES: {
      INDEX: "/admin/categories",
      CREATE: "/admin/categories/create",
      EDIT: "/admin/categories/:id/edit",
    },
  },
  AUTH: {
    SIGNIN: "/sign-in",
    SIGNUP: "/sign-up",
  },
};

export const API_ROUTE_PATH = {
  CATEGORIES: {
    INDEX: "/api/admin/categories",
    DETAIL: "/api/admin/categories/:id",
  },
};
