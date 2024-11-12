// redux/selectedVenuesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedVenues: [], 
};

const selectedVenuesSlice = createSlice({
  name: 'selectedVenues',
  initialState,
  reducers: {
    addVenue: (state, action) => {
      state.selectedVenues.push(action.payload);
    },
    removeVenue: (state, action) => {
      state.selectedVenues = state.selectedVenues.filter(
        (venue) => venue.id !== action.payload.id
      );
    },
  },
});

export const { addVenue, removeVenue } = selectedVenuesSlice.actions;
export default selectedVenuesSlice.reducer;
