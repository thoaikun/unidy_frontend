'use client'

import Post from "@/component/post"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { Grid } from "@mui/material"
import HomeVolunteerLoading from "./loading"
import { useEffect, useState } from "react"
import { fetchPosts } from "@/lib/features/posts/postsSlice"
import ListFriend from "@/component/list-friend"
import { fetchCampaigns } from "@/lib/features/campaigns/campaignsSlice"
import { PostType } from "@/type/post"
import { CampaignType } from "@/type/campaign"
import Campaign from "@/component/campaign"

const HomeVolunteer = () => {
  const { posts, ...postsState } = useAppSelector((state) => state.posts)
  const { campaigns, ...campaignsState } = useAppSelector((state) => state.campaigns)
  const isLoading = postsState.status !== 'succeeded' || campaignsState.status !== 'succeeded'
  const dispatch = useAppDispatch()
  const [contents, setContents] = useState<(PostType | CampaignType)[]>([])

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchCampaigns())
  }, [dispatch])

  useEffect(() => {
    if (!isLoading) {
      const temp = []
      const maxLength = Math.max(posts.length, campaigns.length)
      for (let index = 0; index < maxLength; index++) {
        if (posts[index]) {
          temp.push(posts[index])
        }
        if (campaigns[index]) {
          temp.push(campaigns[index])
        }
      }
      setContents(temp)
    }
  }, [isLoading, posts, campaigns])

  return (isLoading ? (
    <HomeVolunteerLoading />
  ) : (
    <Grid container justifyContent='center' columnGap={8} flexWrap='nowrap'>
      <Grid item container flexShrink={2} maxWidth={680} spacing={4}>
        {contents.map((content, index) => (
          <Grid
            item
            xs={12}
            key={index}
          >
            {(content as PostType).postId ? (
              <Post data={content as PostType} />
            ) : (
              <Campaign data={content as CampaignType} />
            )}
          </Grid>
        ))}
      </Grid >

      <Grid item flexShrink={3} maxWidth={480} display={{ xs: 'none', lg: 'block' }}>
        <ListFriend />
      </Grid>
    </Grid >
  ))
}

export default HomeVolunteer