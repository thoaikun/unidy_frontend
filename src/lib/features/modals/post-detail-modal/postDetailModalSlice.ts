import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PostDetailModalState {
  open: boolean
  postId: string
}

const initialState: PostDetailModalState = {
  open: false,
  postId: '',
}

export const postDetailModalSlice = createSlice({
  name: 'postDetailModal',
  initialState,
  reducers: {
    openPostDetail: (state, action: PayloadAction<string>) => {
      state.open = true
      state.postId = action.payload
    },
    closePostDetail: (state) => {
      state.open = false
      state.postId = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { openPostDetail, closePostDetail } = postDetailModalSlice.actions

export default postDetailModalSlice.reducer