import { BASE_CLIENT_FETCH_OPTIONS } from "@/constants/common";
import { API_ROUTE_PATH } from "@/constants/routes";
import http from "@/libs/http";
import type { AddEditPostTypeRequest } from "@/libs/schema/post.schema";
import type { PostType } from "@/types/post";
import { r } from "@/utils/route";
import type { EPostStatus } from "@prisma/client";

export const postServices = {
  async create(values: AddEditPostTypeRequest) {
    const response = await http.post<AddEditPostTypeRequest>(
      API_ROUTE_PATH.POSTS.INDEX,
      values,
      BASE_CLIENT_FETCH_OPTIONS,
    );

    return response.payload;
  },

  async edit(id: number, values: Omit<AddEditPostTypeRequest, "id">) {
    const response = await http.patch<AddEditPostTypeRequest>(
      r(API_ROUTE_PATH.POSTS.DETAIL, { id }),
      values,
      BASE_CLIENT_FETCH_OPTIONS,
    );

    return response.payload;
  },

  async getAll() {
    const response = await http.get<PostType[]>(
      API_ROUTE_PATH.POSTS.INDEX,
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },

  async getById(id: number) {
    const response = await http.get<PostType>(
      r(API_ROUTE_PATH.POSTS.DETAIL, { id }),
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },

  async deleteById(id: number) {
    const response = await http.delete<PostType>(
      r(API_ROUTE_PATH.POSTS.DETAIL, { id }),
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },

  async changeStatus(id: number, status: EPostStatus) {
    const response = await http.patch<PostType>(
      r(API_ROUTE_PATH.POSTS.CHANGE_STATUS, { id }),
      { status },
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },
};
