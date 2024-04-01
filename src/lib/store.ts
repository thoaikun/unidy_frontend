import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import postsSlice from './features/posts/postsSlice'
import campaignsSlice from './features/campaigns/campaignsSlice'
import backdropSlice from './features/modals/backdrop/backdropSlice'
import postDetailModalSlice from './features/modals/postDetailModal/postDetailModalSlice'
import donateModalSlice from './features/modals/donateModal/donateModalSlice'
import friendsSlice from './features/friends/friendsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      backdrop: backdropSlice,
      postDetailModal: postDetailModalSlice,
      donateModal: donateModalSlice,
      auth: authSlice,
      posts: postsSlice,
      campaigns: campaignsSlice,
      friends: friendsSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']