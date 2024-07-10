import { BASE_CLIENT_FETCH_OPTIONS } from "@/constants/common";
import { API_ROUTE_PATH } from "@/constants/routes";
import http from "@/libs/http";
import type { CommentType } from "@/types/comment";
import { r } from "@/utils/route";
import type { ECommentStatus } from "@prisma/client";

export const commentServices = {
  async getAll() {
    const response = await http.get<CommentType[]>(
      API_ROUTE_PATH.COMMENTS.INDEX,
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },

  async deleteById(id: number) {
    const response = await http.delete<CommentType>(
      r(API_ROUTE_PATH.COMMENTS.DETAIL, { id }),
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },

  async changeStatus(id: number, status: ECommentStatus) {
    const response = await http.patch<CommentType>(
      r(API_ROUTE_PATH.COMMENTS.CHANGE_STATUS, { id }),
      { status },
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },

  async changeOwner(id: number, isOwner: boolean) {
    const response = await http.patch<CommentType>(
      r(API_ROUTE_PATH.COMMENTS.CHANGE_OWNER, { id }),
      { isOwner },
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },
};
