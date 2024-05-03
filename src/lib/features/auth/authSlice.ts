import api from '@/service/api'
import { OrganizationType, UserType } from '@/type/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getCookie, setCookie } from 'cookies-next'

export interface AuthState {
  user: (UserType & OrganizationType) | null
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
    const role = getCookie('role')
    const response = await api.get(`/${role !== 'ORGANIZATION' ? 'users' : 'organization'}/profile`)
    setCookie('user_data', { ...response.data, role: response.data.role || 'ORGANIZATION' })
    return { ...response.data, role: response.data.role || 'ORGANIZATION' }
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
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserType & OrganizationType>) => {
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