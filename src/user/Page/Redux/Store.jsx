import { configureStore } from "@reduxjs/toolkit";
import formReducer from './formSlice';
import selectedVenuesReducer from './selectedVenuesSlice';
import GoogleDataReducer from './GoogleData';

const store = configureStore({
    reducer: {
        form: formReducer,
        selectedVenues: selectedVenuesReducer,
        GoogleData: GoogleDataReducer,
    }
});

export default store;
