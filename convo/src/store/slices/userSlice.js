import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  currentUser: null,
  editUserOpen: false,
  allUser: [],
  openSearchUser: false,
  searchUserData: {
    loading: false,
    data: [],
  },
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
    setOpenSearchUser: (state, action) => {
      state.openSearchUser = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logout,
  setOpenSearchUser,
  handleEditUserModal,
} = userSlice.actions;
export default userSlice.reducer;
