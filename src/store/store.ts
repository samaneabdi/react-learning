import { configureStore } from '@reduxjs/toolkit'
import catSlice from './catSlice'

export const store = configureStore({
  reducer: {catSlice},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch