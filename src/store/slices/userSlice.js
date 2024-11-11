import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateImageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateImageSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    updateImageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUser:(state)=>{
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
  updateStart,
  updateSuccess,
  updateFailure,
  updateImageStart,
  updateImageSuccess,
  updateImageFailure,
  deleteUser
} = userSlice.actions;

export default userSlice.reducer;
