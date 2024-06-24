import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  currentUser: null,
  editUserOpen: false,
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
    handleEditUserModal: (state) => {
      state.editUserOpen = !state.editUserOpen;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logout,
  handleEditUserModal,
} = userSlice.actions;
export default userSlice.reducer;
