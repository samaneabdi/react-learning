import { configureStore } from '@reduxjs/toolkit'
import { catApi } from '../api/catsApiService';
import { todoApi } from '../api/todoApiService';
import catSlice from './catSlice'
import productSlice from './productSlice';

export const store = configureStore({
  reducer: {
    [catApi.reducerPath]: catApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    catSlice, productSlice
  },
  middleware: (getDefaultMiddleware) =>[
    ...getDefaultMiddleware(),
    catApi.middleware,
    todoApi.middleware
  ]

})