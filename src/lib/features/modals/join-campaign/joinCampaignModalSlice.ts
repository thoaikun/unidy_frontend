import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface JoinCampaignModalState {
  open: boolean
  campaignId: string
}

const initialState: JoinCampaignModalState = {
  open: false,
  campaignId: '',
}

export const joinCampaignModalSlice = createSlice({
  name: 'joinCampaignModal',
  initialState,
  reducers: {
    openJoinCampaignModal: (state, action: PayloadAction<string>) => {
      state.open = true
      state.campaignId = action.payload
    },
    closeJoinCampaignModal: (state) => {
      state.open = false
      state.campaignId = ''
    },
  },
})



// Action creators are generated for each case reducer function
export const { openJoinCampaignModal, closeJoinCampaignModal } = joinCampaignModalSlice.actions

export default joinCampaignModalSlice.reducer