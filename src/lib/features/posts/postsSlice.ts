import { postsData } from '@/fakeData'
import api from '@/service/api'
import { PostType } from '@/type/post'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PostsState {
  posts: PostType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await api.get('/posts', {
      params: {
        skip: 0,
        limit: 5,
      }
    })
    return response.data

    // await new Promise(
    //   resolve => setTimeout(resolve, 1000));
    // return postsData
  },
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactPost: (state, action: PayloadAction<{ postId: string, isLiked: boolean }>) => {
      state.posts = state.posts.map((post) =>
        post.postId !== action.payload.postId ? post : { ...post, isLiked: action.payload.isLiked }
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts = []
      state.status = 'failed'
    })
  },
})



// Action creators are generated for each case reducer function
export const { reactPost } = postsSlice.actions

export default postsSlice.reducer