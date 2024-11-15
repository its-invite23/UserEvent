// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    updatedFormData: {}, 
  },
  reducers: {
    updateData: (state, action) => {
      state.updatedFormData = {
        ...state.updatedFormData,
        ...action.payload, 
      };
    },
    clearData: (state) => {
      state.updatedFormData = {}; 
    },   
  },
});


export const { updateData, clearData } = formSlice.actions;
export default formSlice.reducer;
