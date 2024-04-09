import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface DonateModalState {
  open: boolean
  campaignId: string
  organizationUserId: number
}

const initialState: DonateModalState = {
  open: false,
  campaignId: '',
  organizationUserId: 0,
}

export const donateModalSlice = createSlice({
  name: 'donateModal',
  initialState,
  reducers: {
    openDonateModal: (state, action: PayloadAction<{ campaignId: string, organizationUserId: number }>) => {
      state.open = true
      state.campaignId = action.payload.campaignId
      state.organizationUserId = action.payload.organizationUserId
    },
    closeDonateModal: (state) => {
      state.open = false
      state.campaignId = ''
      state.organizationUserId = 0
    },
  },
})



// Action creators are generated for each case reducer function
export const { openDonateModal, closeDonateModal } = donateModalSlice.actions

export default donateModalSlice.reducer