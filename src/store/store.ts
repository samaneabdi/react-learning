import { configureStore } from '@reduxjs/toolkit'
import catSlice from './catSlice'

export const store = configureStore({
  reducer: {catSlice},
})