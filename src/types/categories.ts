export interface CategoryType {
  id: number;
  name: string;
  description: string;
  slug: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryMetaType {
  id: number;
  name: string;
  slug: string;
  totalPostCount: number;
}
