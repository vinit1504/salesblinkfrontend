/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// const baseURL = "http://localhost:8080/api/v1";
const baseURL = "https://salesblinkbackend.vercel.app";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    const response = await axios.post(`${baseURL}/auth/signup`, formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const response = await axios.post(`${baseURL}/auth/signin`, formData, {
    withCredentials: true,
  });

  return response.data;
});

export const chechAuth = createAsyncThunk("auth/check-auth", async () => {
  const response = await axios.get(`${baseURL}/auth/check-auth`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate , proxy-revalidate",
    },
  });
  return response.data;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post(
    `${baseURL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = !action.payload.success ? false : true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(chechAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(chechAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = !action.payload.success ? null : action.payload.user;
        state.isAuthenticated = !action.payload.success ? false : true;
      })
      .addCase(chechAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
