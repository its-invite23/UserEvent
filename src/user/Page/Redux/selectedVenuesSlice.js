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
        (venue) => venue.place_id !== action.payload // Use payload as ID
      );
    },
    clearAllVenues: (state) => {
      state.selectedVenues = [];
    },
  },
});

export const { addVenue, removeVenue, clearAllVenues } = selectedVenuesSlice.actions;
export default selectedVenuesSlice.reducer;
