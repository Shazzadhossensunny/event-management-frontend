import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// User type based on JWT payload
export interface TUser {
  userId: string;
  email: string;
  exp: number;
  iat: number;
}

// Auth state type
export interface TAuth {
  user: null | TUser;
  email: null | string;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: TAuth = {
  user: null,
  email: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(state, action);
      const { user, email, token } = action.payload;
      state.token = token;
      state.user = user;
      state.email = email;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
