export const ROUTE_PATH = {
  HOME: "/",
  BLOG: {
    INDEX: "/blogs",
    DETAIL: "/blogs/:id",
  },
  CATEGORY: {
    INDEX: "/category",
    SLUG: "/category/:slug",
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
    COMMENTS: "/api/admin/posts/:id/comments",
    CHANGE_STATUS: "/api/admin/posts/:id/change-status",
    VIEW: "/api/admin/posts/:id/view",
  },
  COMMENTS: {
    INDEX: "/api/admin/comments",
    DETAIL: "/api/admin/comments/:id",
    CHANGE_STATUS: "/api/admin/comments/:id/change-status",
  },
  USER: {
    COMMENTS: {
      INDEX: "/api/user/comments",
    },
  },
};
