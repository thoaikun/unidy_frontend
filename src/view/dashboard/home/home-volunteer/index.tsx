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
    <Grid container justifyContent='center' columnGap={8} flexWrap={"nowrap"}>
      <Grid item container flexShrink={2} maxWidth={680} spacing={4}>
        {posts.map((item, index) => (
          <Grid item xs={12} key={item.postId}>
            <Post data={item} key={index} />
          </Grid>
        ))}
      </Grid >

      <Grid item flexShrink={3} maxWidth={480} display={{ xs: 'none', lg: 'block' }}
      >
        <FriendList />
      </Grid>
    </Grid >
  )
  )
}

export default HomeVolunteer