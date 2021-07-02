import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

export const userLogin = createAsyncThunk("users/login", async (inputs) => {
  try {
    const { data } = await authApi.post("/login", inputs);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const userRegister = createAsyncThunk(
  "users/register",
  async (inputs) => {
    try {
      const { data } = await authApi.post("/register", inputs);
      return data;
    } catch (error) {
      console.log(error);
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

const initialState = {
  user: [],
  isAuthenticated: false,
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
  },
  extraReducers: {
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
  },
});

export const { setIsAuthenticated, userLogout } = usersSlice.actions;

export default usersSlice.reducer;
