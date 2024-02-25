import { UserType } from '@/type/user'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ModalsState {
  user: UserType | null
}

const initialState: ModalsState = {
  user: typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('userData') || 'null') : null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = AuthSlice.actions

export default AuthSlice.reducer