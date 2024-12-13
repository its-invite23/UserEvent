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
      // Check if an entry with the same place_id already exists
      const exists = state.updatedFormData.some(
        (item) => item.place_id === action.payload.place_id
      );
      if (!exists) {
        state.updatedFormData = [...state.updatedFormData, action.payload]; // Add new data if place_id is unique
      }
    },
  },
});

export const { clearGoogleData, addGoogleData } = GoogleData.actions;
export default GoogleData.reducer;

