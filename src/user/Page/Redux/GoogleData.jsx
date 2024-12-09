import { createSlice } from "@reduxjs/toolkit";

const GoogleData = createSlice({
    name: "GoogleData",
    initialState: {
      updatedFormData: {}, // Should be an empty object initially
    },
    reducers: {
      clearGoogleData: (state) => {
        state.updatedFormData = {}; // Reset to an empty object
      },
      addGoogleData: (state, action) => {
        const isDuplicate = Object.values(state.updatedFormData).some(
          (item) => JSON.stringify(item) === JSON.stringify(action.payload)
        );
        if (!isDuplicate) {
          const id = action.payload.id || new Date().getTime().toString(); // Use a unique ID
          state.updatedFormData[id] = action.payload;
        }
      },
    },
  });
  

export const { clearGoogleData, addGoogleData } = GoogleData.actions;
export default GoogleData.reducer;
