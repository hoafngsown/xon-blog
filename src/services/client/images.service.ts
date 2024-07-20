import { BASE_CLIENT_FETCH_OPTIONS } from "@/constants/common";
import { API_ROUTE_PATH } from "@/constants/routes";
import http from "@/libs/http";
import type { AddEditImageType } from "@/libs/schema/image.schema";
import type { AddEditPostTypeRequest } from "@/libs/schema/post.schema";
import type { ImageType } from "@/types/images";

export const imageServices = {
  async upload(formData: FormData) {
    const response = await http.post<string[]>(
      API_ROUTE_PATH.IMAGES.UPLOAD,
      formData,
      BASE_CLIENT_FETCH_OPTIONS,
    );

    return response.payload;
  },

  async create(values: AddEditImageType) {
    const response = await http.post<AddEditPostTypeRequest>(
      API_ROUTE_PATH.IMAGES.INDEX,
      values,
      BASE_CLIENT_FETCH_OPTIONS,
    );

    return response.payload;
  },

  async edit(values: AddEditImageType) {
    const response = await http.patch<AddEditPostTypeRequest>(
      API_ROUTE_PATH.IMAGES.INDEX,
      values,
      BASE_CLIENT_FETCH_OPTIONS,
    );

    return response.payload;
  },

  async getAll() {
    const response = await http.get<ImageType[]>(
      API_ROUTE_PATH.IMAGES.INDEX,
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },
};
