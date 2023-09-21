import { createSlice } from '@reduxjs/toolkit';
import { productInitialList } from "../../src/api/productData";

const productSlice = createSlice({
  name: 'product',
  initialState: {
    selectedProducts: [],
    products: productInitialList,
    totalPrice: 0,
  },
  reducers: {
    addToProductBasket: (state, action) => {
      const { product } = action.payload;
      const existingProductIndex = state.selectedProducts.findIndex((p) => p.id === product.id);

      if (existingProductIndex !== -1) {
        state.selectedProducts[existingProductIndex].quantity += 1;
      } else {
        state.selectedProducts.push({ ...product, quantity: 1 });
      }

      const productIndex = state.products.findIndex((p) => p.id === product.id);
      if (productIndex !== -1) {
        state.products[productIndex].quantity += 1;
      }

      state.totalPrice += product.price;
    },
    removeFromProductBasket: (state, action) => {
      const { product } = action.payload;
      const existingProductIndex = state.selectedProducts.findIndex((p) => p.id === product.id);

      if (existingProductIndex !== -1) {
        if (state.selectedProducts[existingProductIndex].quantity > 1) {
          state.selectedProducts[existingProductIndex].quantity -= 1;
        } else {
          state.selectedProducts.splice(existingProductIndex, 1);
        }
      }

      const productIndex = state.products.findIndex((p) => p.id === product.id);
      if (productIndex !== -1 && state.products[productIndex].quantity > 0) {
        state.products[productIndex].quantity -= 1;
        state.totalPrice -= product.price;
      }
    },
  },
});

export const { addToProductBasket, removeFromProductBasket } = productSlice.actions;

export default productSlice.reducer;