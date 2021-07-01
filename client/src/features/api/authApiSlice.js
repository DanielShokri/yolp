import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/auth"
    : "http://localhost:3001/auth";

export const restaurantsApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints(builder) {
    return {
      fetchRestaurant: builder.query({
        query(id) {
          return `/${id}`;
        },
      }),
      fetchRestaurants: builder.query({
        query() {
          return `/`;
        },
      }),
    };
  },
});

export const { useFetchRestaurantQuery, useFetchRestaurantsQuery } =
  restaurantsApiSlice;
