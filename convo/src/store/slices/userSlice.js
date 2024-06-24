import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user-data",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      localStorage.clear();
      state.currentUser = null;
      state.loading = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
