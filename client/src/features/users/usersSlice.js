import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
import usersApi from "../../api/usersApi";

export const userLogin = createAsyncThunk(
  "users/login",
  async (inputs, thunkAPI) => {
    try {
      const { data } = await authApi.post("/login", inputs);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const userRegister = createAsyncThunk(
  "users/register",
  async (inputs, thunkAPI) => {
    try {
      const { data } = await authApi.post("/register", inputs);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const isVerify = createAsyncThunk(
  "users/is-verify",
  async ({ getState }) => {
    try {
      const { data } = await authApi.get("/is-verify", {
        headers: { Authorization: getState().user.token },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleSaveToFavorite = createAsyncThunk(
  "users/add-favorite",
  async ({ user_id, restaurantToAdd }) => {
    try {
      const { data } = await usersApi.post("/add-favorite", {
        restaurantToAdd,
        user_id,
      });
      console.log("🚀 ~ file: usersSlice.js ~ line 55 ~ data", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleRemoveFromFavorite = createAsyncThunk(
  "users/remove-favorite",
  async ({ user_id, restaurant_id }) => {
    try {
      await usersApi.delete("/remove-favorite", {
        data: {
          restaurant_id,
          user_id,
        },
      });
      return restaurant_id;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  user: [],
  isAuthenticated: false,
  error: "",
};

const usersSlice = createSlice({
  name: "users/auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, { payload }) {
      state.isAuthenticated = payload;
    },
    userLogout(state) {
      state.user = [];
      state.isAuthenticated = false;
    },
    clearUserError(state) {
      state.error = "";
    },
  },
  extraReducers: {
    [userLogin.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isAuthenticated = false;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
    },
    [isVerify.fulfilled]: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isAuthenticated = false;
    },
    [handleSaveToFavorite.fulfilled]: (state, { payload }) => {
      state.user.favorites.push(payload);
    },
    [handleRemoveFromFavorite.fulfilled]: (state, { payload }) => {
      state.user.favorites = state.user.favorites.filter(
        (fav) => fav.restaurant_id !== payload
      );
    },
    [handleSaveToFavorite.rejected]: (state, { payload }) => {
      userLogout();
    },
    [handleRemoveFromFavorite.rejected]: (state, { payload }) => {
      userLogout();
    },
  },
});

export const { setIsAuthenticated, userLogout, clearUserError } =
  usersSlice.actions;

export default usersSlice.reducer;
