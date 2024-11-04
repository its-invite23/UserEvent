import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], 
};

const cartSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(i => i.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    removeItem: (state, action) => {
      const id = action.payload; 
      state.cartItems = state.cartItems.filter(item => item.id !== id);
    },
    DeleteCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addItem, removeItem, DeleteCart } = cartSlice.actions;
export default cartSlice.reducer;

