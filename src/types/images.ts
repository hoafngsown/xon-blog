import type { MediaType } from "@prisma/client";

export interface ImageType {
  id: number;
  text?: string;
  url: string;
  type: MediaType;
}
