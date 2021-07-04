import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/auth"
    : "http://localhost:3001/auth";

export const authApiSlice = createApi({
  reducerPath: "auth",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints(builder) {
    return {
      fetchUser: builder.query({
        query(id) {
          return `/user/${id}`;
        },
      }),
    };
  },
});

export const { useFetchUserQuery } = authApiSlice;
