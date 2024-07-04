import { BASE_CLIENT_FETCH_OPTIONS } from "@/constants/common";
import { API_ROUTE_PATH } from "@/constants/routes";
import http from "@/libs/http";
import type { AddEditCategoryType } from "@/libs/schema/category.schema";
import type { CategoryType } from "@/types/categories";
import { r } from "@/utils/route";

export const categoryServices = {
  async createNewCategory(values: AddEditCategoryType) {
    const response = await http.post<AddEditCategoryType>(
      API_ROUTE_PATH.CATEGORIES.INDEX,
      values,
      BASE_CLIENT_FETCH_OPTIONS,
    );

    return response.payload;
  },

  async editCategory(id: number, values: Omit<AddEditCategoryType, "id">) {
    const response = await http.patch<AddEditCategoryType>(
      r(API_ROUTE_PATH.CATEGORIES.DETAIL, { id }),
      values,
      BASE_CLIENT_FETCH_OPTIONS,
    );

    return response.payload;
  },

  async getAll() {
    const response = await http.get<CategoryType[]>(
      API_ROUTE_PATH.CATEGORIES.INDEX,
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },

  async getById(id: number) {
    const response = await http.get<CategoryType>(
      r(API_ROUTE_PATH.CATEGORIES.DETAIL, { id }),
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },

  async deleteById(id: number) {
    const response = await http.delete<CategoryType>(
      r(API_ROUTE_PATH.CATEGORIES.DETAIL, { id }),
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },
};
