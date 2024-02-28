import api from '@/service/api'
import { UserType } from '@/type/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ModalsState {
  user: UserType | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: ModalsState = {
  user: null,
  status: 'idle',
  error: null
}

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async () => {
    const response = await api.get('/users/profile')
    return response.data
  },
)

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(fetchUserData.rejected, (state) => {
      state.user = null
      state.status = 'failed'
    })
  },
})



// Action creators are generated for each case reducer function
export const { setUser } = AuthSlice.actions

export default AuthSlice.reducer