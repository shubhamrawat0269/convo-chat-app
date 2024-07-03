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
  searchUserInput: null,
  onlineUser: [],
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
    handleSearchUserInput: (state, action) => {
      state.searchUserInput = action.payload;
    },
    setSearchUserData: (state, action) => {
      state.searchUserData.data = action.payload;
      state.searchUserData.loading = false;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
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
  handleSearchUserInput,
  setSearchUserData,
  setOnlineUser,
} = userSlice.actions;
export default userSlice.reducer;
