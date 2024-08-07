import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: "vhbsdvhbhvbfhbvhbfvfhbh",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.auth = action.payload.authKey;
    },
  },
});

export const { addAuth } = authSlice.actions;

export default authSlice.reducer;
