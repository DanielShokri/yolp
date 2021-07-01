import { configureStore } from "@reduxjs/toolkit";
import restaurantsReducer from "../features/restaurants/restaurantsSlice";
import { restaurantsApiSlice } from "../features/api/restaurantsApiSlice";

export default configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    [restaurantsApiSlice.reducerPath]: restaurantsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(restaurantsApiSlice.middleware);
  },
});
