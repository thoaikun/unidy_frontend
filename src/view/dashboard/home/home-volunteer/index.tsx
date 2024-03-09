'use client'

import FriendList from "@/component/friend-list"
import Post from "@/component/post"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { Box, Grid } from "@mui/material"
import HomeVolunteerLoading from "./loading"
import { useEffect } from "react"
import { fetchPosts } from "@/lib/features/posts/postsSlice"

const HomeVolunteer = () => {
  const { posts, status } = useAppSelector((state) => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (status !== 'succeeded' ? (
    <HomeVolunteerLoading />
  ) : (
    <Grid container justifyContent='center' columnGap={8} mt={4}>
      <Grid item container xs='auto' flexDirection='column' spacing={4}>
        {posts.map((item, index) => (
          <Grid item key={item.postId}>
            <Post data={item} key={index} />
          </Grid>
        ))}
      </Grid >

      <Grid item xs='auto'>
        <Box width={480}>
          <FriendList />
        </Box>
      </Grid>
    </Grid >
  )
  )
}

export default HomeVolunteer