export const ROUTE_PATH = {
  HOME: "/",
  BLOG: {
    INDEX: "/blogs",
    DETAIL: "/blogs/:id",
  },
  CATEGORY: {
    INDEX: "/category",
  },
  ABOUT: "/about",
  CONTACT: "/contacts",
  EXPERIENCES: "/experiences",
  ADMIN: {
    INDEX: "/admin",
    COMMENTS: {
      INDEX: "/admin/comments",
    },
    POSTS: {
      INDEX: "/admin/posts",
      CREATE: "/admin/posts/create",
      EDIT: "/admin/posts/:id/edit",
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
  POSTS: {
    INDEX: "/api/admin/posts",
    DETAIL: "/api/admin/posts/:id",
    CHANGE_STATUS: "/api/admin/posts/:id/change-status",
  },
};
