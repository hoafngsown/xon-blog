import { BASE_CLIENT_FETCH_OPTIONS } from "@/constants/common";
import { API_ROUTE_PATH } from "@/constants/routes";
import http from "@/libs/http";
import type { AddEditPostTypeRequest } from "@/libs/schema/post.schema";

export const postServerServices = {
  async create(values: AddEditPostTypeRequest) {
    const response = await http.post<AddEditPostTypeRequest>(
      API_ROUTE_PATH.POSTS.INDEX,
      values,
      BASE_CLIENT_FETCH_OPTIONS,
    );

    return response.payload;
  },
};
