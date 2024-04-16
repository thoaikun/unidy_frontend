import { notificationsData } from '@/fakeData'
import api from '@/service/api'
import { NotificationType } from '@/type/notification'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NotificationsState {
  unseenCount: number
  notifications: NotificationType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: NotificationsState = {
  unseenCount: 0,
  notifications: [],
  status: 'idle',
  error: null,
}

export const fetchUnseenCount = createAsyncThunk(
  'notifications/fetchUnseenCount',
  async () => {
    return 69
    
    const response = await api.get('/users/notifications/unseen/count')
    return response.data.unseenCount
  },
)

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await api.get('/users/notifications', {
      params: {
        pageNumber: 0,
        pageSize: 5,
      }
    })
    return response.data
  },
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetNotifications: () => initialState,
    markReadAll: (state) => {
      state.notifications = state.notifications.map((notification) =>
        notification.seenTime ?
          notification :
          { ...notification, seenTime: new Date().toString() }
      )
      state.unseenCount = 0
    },
    markReadById: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.map((notification) =>
        notification.notificationId !== action.payload ?
          notification :
          { ...notification, seenTime: new Date().toString() }
      )
      state.unseenCount -= 1
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUnseenCount.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUnseenCount.fulfilled, (state, action: PayloadAction<number>) => {
      state.unseenCount = action.payload
      state.status = 'idle'
    })
    builder.addCase(fetchUnseenCount.rejected, (state) => {
      state.status = 'failed'
    })
    builder.addCase(fetchNotifications.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<NotificationType[]>) => {
      state.notifications = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(fetchNotifications.rejected, (state) => {
      state.notifications = []
      state.status = 'failed'
    })
  },
})



// Action creators are generated for each case reducer function
export const { resetNotifications, markReadAll, markReadById } = notificationsSlice.actions

export default notificationsSlice.reducer