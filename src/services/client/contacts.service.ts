import { BASE_CLIENT_FETCH_OPTIONS } from "@/constants/common";
import { API_ROUTE_PATH } from "@/constants/routes";
import http from "@/libs/http";
import type { ContactBodyType, ContactType } from "@/types/contact";

export const contactServices = {
  async getAll() {
    const response = await http.get<ContactType[]>(
      API_ROUTE_PATH.CONTACTS.INDEX,
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },

  async create(body: ContactBodyType) {
    const response = await http.post<ContactBodyType>(
      API_ROUTE_PATH.CONTACTS.INDEX,
      body,
      BASE_CLIENT_FETCH_OPTIONS,
    );
    return response.payload;
  },
};
