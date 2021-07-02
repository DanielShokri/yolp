import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restaurantsApi from "../../api/restaurantsApi";

export const getRestaurantsByQuery = createAsyncThunk(
  "restaurants/search",
  async (query) => {
    try {
      const { data } = await restaurantsApi.post(`/search`, query);
      return data.data.restaurants;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleAddRestaurant = createAsyncThunk(
  "restaurants/add",
  async (props) => {
    try {
      const { data } = await restaurantsApi.post("/", props);
      return data.data.restaurants[0];
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleEditRestaurant = createAsyncThunk(
  "restaurants/edit",
  async ({ inputsWithImage, restaurantId }) => {
    try {
      await restaurantsApi.put(`/${restaurantId}`, inputsWithImage);
      // if (res.status === 200) setOpen(true);
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleDeleteRestaurant = createAsyncThunk(
  "restaurants/delete",
  async ({ restToDeleteId }) => {
    try {
      await restaurantsApi.delete(`/${restToDeleteId}`);
      return restToDeleteId;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  restaurants: [],
  restaurant: {},
  query: "",
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants(state, { payload }) {
      state.restaurants = payload;
    },
    setRestaurant(state, { payload }) {
      state.restaurant = payload;
    },
    setSearchQuery(state, { payload }) {
      state.query = payload;
    },
  },
  extraReducers: {
    [getRestaurantsByQuery.fulfilled]: (state, { payload }) => {
      state.restaurants = payload;
    },
    [handleAddRestaurant.fulfilled]: (state, { payload }) => {
      state.restaurant = payload;
    },
    [handleDeleteRestaurant.fulfilled]: (state, { payload }) => {
      state.restaurants = state.restaurants.filter((restaurant) => {
        return restaurant.id !== payload;
      });
    },
  },
});

export const { setRestaurants, setRestaurant, setSearchQuery } =
  restaurantsSlice.actions;

export default restaurantsSlice.reducer;
