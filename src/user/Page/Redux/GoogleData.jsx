import { createSlice } from "@reduxjs/toolkit";

const GoogleData = createSlice({
  name: "GoogleData",
  initialState: {
    updatedFormData: [], // Initialize as an empty array
  },
  reducers: {
    clearGoogleData: (state) => {
      state.updatedFormData = []; // Reset to an empty array
    },
    addGoogleData: (state, action) => {
      state.updatedFormData.push(action.payload); // Add new data to the array
    },
  },
});

export const { clearGoogleData, addGoogleData } = GoogleData.actions;
export default GoogleData.reducer;
