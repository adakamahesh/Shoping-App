import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a cart item
interface CartItem {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  rating: string;
  thumbnail: string;
  stock: string; 
  quantity?: number;
}

// Define the type of the initial state
const initialState: CartItem[] = [];

// Create the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add an item to the cart
    add: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload);
    },
    // remove an item to the cart
    remove: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

// Export the actions and reducer
export const { add , remove } = cartSlice.actions;
export default cartSlice.reducer;
