// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: {}, // Initial state for form data
  },
  reducers: {
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload, // Merge new data with existing data
      };
    },
  },
});

export const { updateFormData } = formSlice.actions;
export default formSlice.reducer;
