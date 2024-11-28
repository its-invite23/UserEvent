import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    updatedFormData: {},
    form: [],
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
      state.form = [];
    },
    addGoogleData: (state, action) => {
      const isDuplicate = state.form.some(
        (item) => JSON.stringify(item) === JSON.stringify(action.payload)
      );
      if (!isDuplicate) {
        state.form.push(action.payload);
      }
    },
  },
});

export const { updateData, clearData, addGoogleData } = formSlice.actions;
export default formSlice.reducer;
