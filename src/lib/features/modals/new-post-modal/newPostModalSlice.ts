import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NewPostModalState {
  open: boolean
}

const initialState: NewPostModalState = {
  open: false,
}

export const newPostModalSlice = createSlice({
  name: 'newPostModal',
  initialState,
  reducers: {
    openNewPost: (state) => {
      state.open = true
    },
    closeNewPost: (state) => {
      state.open = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { openNewPost, closeNewPost, } = newPostModalSlice.actions

export default newPostModalSlice.reducer