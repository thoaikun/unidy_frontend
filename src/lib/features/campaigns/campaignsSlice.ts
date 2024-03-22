import { campaignsData } from '@/fakeData'
import api from '@/service/api'
import { CampaignType } from '@/type/campaign'
import { PostType } from '@/type/post'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CampaignsState {
  campaigns: CampaignType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: CampaignsState = {
  campaigns: [],
  status: 'idle',
  error: null
}

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async () => {
    const response = await api.get('/campaign/recommendation', {
      params: {
        skip: 0,
        limit: 5,
      }
    })
    return response.data.campaigns
    // await new Promise(
    //   resolve => setTimeout(resolve, 1000));
    // return campaignsData
  },
)

export const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    reactCampaign: (state, action: PayloadAction<{ postId: string, isLiked: boolean }>) => {
      state.campaigns = state.campaigns.map((campaignDetail) =>
        campaignDetail.campaign.campaignId !== action.payload.postId ? campaignDetail : { ...campaignDetail, isLiked: action.payload.isLiked }
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCampaigns.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCampaigns.fulfilled, (state, action: PayloadAction<CampaignType[]>) => {
      state.campaigns = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(fetchCampaigns.rejected, (state) => {
      state.campaigns = []
      state.status = 'failed'
    })
  },
})



// Action creators are generated for each case reducer function
export const { reactCampaign } = campaignsSlice.actions

export default campaignsSlice.reducer