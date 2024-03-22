import { configureStore } from '@reduxjs/toolkit'
import modalsSlice from './features/modals/modalsSlice'
import authSlice from './features/auth/authSlice'
import postsSlice from './features/posts/postsSlice'
import campaignsSlice from './features/campaigns/campaignsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      modals: modalsSlice,
      auth: authSlice,
      posts: postsSlice,
      campaigns: campaignsSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']