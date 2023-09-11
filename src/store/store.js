import { configureStore } from '@reduxjs/toolkit'
import catSlice from './catSlice'
import productSlice from './productSlice';

export const store = configureStore({
  reducer: {catSlice, productSlice},
})