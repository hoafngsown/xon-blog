export interface CategoryType {
  id: number;
  name: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryMetaType {
  id: number;
  name: string;
  slug: string;
  totalPostCount: number;
}

export type CategoryMetadataType = Pick<
  CategoryType,
  "name" | "description" | "slug" | "id"
>;
