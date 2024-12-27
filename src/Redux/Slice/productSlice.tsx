import { createSlice } from '@reduxjs/toolkit';

interface SelectedProductState {
  product: any | null;
}

const initialState: SelectedProductState = {
  product: null,
};

const productSlice = createSlice({
  name: 'product', // Burayı 'product' olarak değiştirdik
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.product = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.product = null;
    },
  },
});

export const { setSelectedProduct, clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
