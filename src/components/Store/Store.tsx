import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './CartSlice';
import updateProductReducer from './UpdateSlice'; // Import the updateProductReducer correctly

const store = configureStore({
  reducer: {
    cart: cartSlice, // Use cartSlice once
    updateProduct: updateProductReducer, // Assuming you have a slice for updating the product
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;