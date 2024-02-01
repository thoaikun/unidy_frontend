import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ModalsState {
  postDetail: {
    open: boolean
    id: string
  }
}

const initialState: ModalsState = {
  postDetail: {
    open: false,
    id: '',
  },
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openPostDetail: (state, action: PayloadAction<string>) => {
      state.postDetail.open = true
      state.postDetail.id = action.payload
    },
    closePostDetail: (state) => {
      state.postDetail.open = false
      state.postDetail.id = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { openPostDetail, closePostDetail } = modalsSlice.actions

export default modalsSlice.reducer