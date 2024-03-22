import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ModalsState {
  postDetail: {
    open: boolean
    postId: string
  }
  donateModal: {
    open: boolean
    campaignId: string
  }
}

const initialState: ModalsState = {
  postDetail: {
    open: false,
    postId: '',
  },
  donateModal: {
    open: false,
    campaignId: '',
  },
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openPostDetail: (state, action: PayloadAction<string>) => {
      state.postDetail.open = true
      state.postDetail.postId = action.payload
    },
    closePostDetail: (state) => {
      state.postDetail.open = false
      state.postDetail.postId = ''
    },
    openDonateModal: (state, action: PayloadAction<string>) => {
      state.donateModal.open = true
      state.donateModal.campaignId = action.payload
    },
    closeDonateModal: (state) => {
      state.donateModal.open = false
      state.donateModal.campaignId = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { openPostDetail, closePostDetail, openDonateModal, closeDonateModal } = modalsSlice.actions

export default modalsSlice.reducer