import { notificationsData } from '@/fakeData'
import api from '@/service/api'
import { NotificationType } from '@/type/notification'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NotificationsState {
  notifications: NotificationType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: NotificationsState = {
  notifications: [],
  status: 'idle',
  error: null,
}

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    // await new Promise(
    //   resolve => setTimeout(resolve, 1000));
    // return notificationsData

    const response = await api.get('/users/notifications', {
      params: {
        skip: 0,
        limit: 5,
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
    },
    markReadById: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.map((notification) =>
        notification.notificationId !== action.payload ?
          notification :
          { ...notification, seenTime: new Date().toString() }
      )
    },
  },
  extraReducers: (builder) => {
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