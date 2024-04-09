import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CampaignDetailModalState {
  open: boolean
  campaignId: string
}

const initialState: CampaignDetailModalState = {
  open: false,
  campaignId: '',
}

export const campaignDetailModalSlice = createSlice({
  name: 'campaignDetailModal',
  initialState,
  reducers: {
    openCampaignDetail: (state, action: PayloadAction<string>) => {
      state.open = true
      state.campaignId = action.payload
    },
    closeCampaignDetail: (state) => {
      state.open = false
      state.campaignId = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { openCampaignDetail, closeCampaignDetail } = campaignDetailModalSlice.actions

export default campaignDetailModalSlice.reducer