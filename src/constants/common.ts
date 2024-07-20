import type { CustomOptions } from "@/libs/http";

export const MY_SOCIAL_LINK = {
  FB: "https://www.facebook.com/hoafng.sown/",
  INS: "https://www.instagram.com/hoafng.sown/",
  LINKEDIN: "https://www.linkedin.com/in/hoafng-xown/",
  GITHUB: "https://github.com/hoafngsown",
};

export const BASE_CLIENT_FETCH_OPTIONS:
  | Omit<CustomOptions, "body">
  | undefined = {
  cache: "no-cache",
};

export const ACCEPT_IMAGE_TYPE = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/webp",
];

export const LIMIT_FILE_SIZE = 8;
