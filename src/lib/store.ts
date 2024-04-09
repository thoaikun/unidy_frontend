import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import postsSlice from './features/posts/postsSlice'
import campaignsSlice from './features/campaigns/campaignsSlice'
import backdropSlice from './features/modals/backdrop/backdropSlice'
import postDetailModalSlice from './features/modals/post-detail-modal/postDetailModalSlice'
import donateModalSlice from './features/modals/donate-modal/donateModalSlice'
import friendsSlice from './features/friends/friendsSlice'
import notificationsSlice from './features/notifications/notificationsSlide'
import newPostModalSlice from './features/modals/new-post-modal/newPostModalSlice'
import campaignDetailModalSlice from './features/modals/campaign-detail-modal/campaignDetailModalSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      backdrop: backdropSlice,
      newPostModal: newPostModalSlice,
      postDetailModal: postDetailModalSlice,
      campaignDetailModal: campaignDetailModalSlice,
      donateModal: donateModalSlice,
      auth: authSlice,
      posts: postsSlice,
      campaigns: campaignsSlice,
      friends: friendsSlice,
      notifications: notificationsSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']