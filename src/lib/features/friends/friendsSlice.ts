import { friendsData } from '@/fakeData'
import api from '@/service/api'
import { CampaignType } from '@/type/campaign'
import { UserNodeType } from '@/type/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FriendsState {
  friends: UserNodeType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: FriendsState = {
  friends: [],
  status: 'idle',
  error: null
}

export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async () => {
    const response = await api.get('/users/get-list-friend', {
      params: {
        skip: 0,
        limit: 5,
      }
    })
    return response.data

    // await new Promise(
    //   resolve => setTimeout(resolve, 1000));
    // return friendsData
  },
)

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    resetFriends: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchFriends.fulfilled, (state, action: PayloadAction<UserNodeType[]>) => {
      state.friends = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(fetchFriends.rejected, (state) => {
      state.friends = []
      state.status = 'failed'
    })
  },
})



// Action creators are generated for each case reducer function
export const { resetFriends } = friendsSlice.actions

export default friendsSlice.reducer