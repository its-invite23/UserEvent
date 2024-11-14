// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    updatedFormData: {}, // Ensure this matches the structure of formData
  },
  reducers: {
    updateForm: (state, action) => {
      state.updatedFormData = {
        ...state.updatedFormData,
        ...action.payload, // Ensure payload matches your expectation
      };
    },
  },
});


export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
