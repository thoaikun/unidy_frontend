import { userData } from '@/fakeData'
import api from '@/service/api'
import { UserType } from '@/type/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { setCookie } from 'cookies-next'

export interface AuthState {
  user: UserType | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
}

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async () => {
    // await new Promise(
    //   resolve => setTimeout(resolve, 1000));
    // setCookie('user_data', userData)
    // return userData

    const response = await api.get('/users/profile')
    return response.data
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(fetchUser.rejected, (state) => {
      state.user = null
      state.status = 'failed'
    })
  },
})



// Action creators are generated for each case reducer function
export const { resetUser } = authSlice.actions

export default authSlice.reducer