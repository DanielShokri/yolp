import { configureStore } from "@reduxjs/toolkit";
import restaurantsReducer from "../features/restaurants/restaurantsSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import { restaurantsApiSlice } from "../features/api/restaurantsApiSlice";
import { authApiSlice } from "../features/api/authApiSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "users",
  storage,
};
const persistedReducer = persistReducer(persistConfig, usersReducer);

export default configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    users: persistedReducer,
    [restaurantsApiSlice.reducerPath]: restaurantsApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    restaurantsApiSlice: restaurantsApiSlice.middleware,
    authApiSlice: authApiSlice.middleware,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(
  //     restaurantsApiSlice.middleware,
  //     authApiSlice.middleware
  //   );
  // },
});
