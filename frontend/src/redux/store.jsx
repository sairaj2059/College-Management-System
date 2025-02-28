import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import navSlice from './slices/navSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tabs: navSlice.reducer,
  },
})