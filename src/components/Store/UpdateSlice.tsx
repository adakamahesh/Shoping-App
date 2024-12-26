import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UpdateProductState {
  productId: number;
  title: string;
}

const initialState: UpdateProductState = {
  productId: 0,
  title: '',
};

const updateProductSlice = createSlice({
  name: 'updateProduct',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<UpdateProductState>) => {
      state.productId = action.payload.productId;
      state.title = action.payload.title;
    },
  },
});

export const { setProduct } = updateProductSlice.actions;
export default updateProductSlice.reducer;
