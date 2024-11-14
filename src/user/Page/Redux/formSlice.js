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
   
  },
});


export const { updateData, } = formSlice.actions;
export default formSlice.reducer;
