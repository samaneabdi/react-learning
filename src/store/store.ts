import { configureStore } from '@reduxjs/toolkit'
import catSlice from './catSlice'
import productSlice from './productSlice';

const store = configureStore({
  reducer: {catSlice, productSlice},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store