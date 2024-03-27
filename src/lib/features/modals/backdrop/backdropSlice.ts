import { createSlice } from '@reduxjs/toolkit'

export interface BackdropState {
  open: boolean
}

const initialState: BackdropState = {
  open: false
}

export const backdropSlice = createSlice({
  name: 'backdrop',
  initialState,
  reducers: {
    openBackdrop: (state) => {
      state.open = true
    },
    closeBackdrop: (state) => {
      state.open = false
    },
  },
})



// Action creators are generated for each case reducer function
export const { openBackdrop, closeBackdrop } = backdropSlice.actions

export default backdropSlice.reducer