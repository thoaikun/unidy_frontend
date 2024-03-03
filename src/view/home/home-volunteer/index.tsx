'use client'

import FriendList from "@/component/friend-list"
import Post from "@/component/post"
import { useAppSelector } from "@/lib/hook"
import { PostType } from "@/type/post"
import { Box, Grid } from "@mui/material"
import HomeOrganization from "../home-organization"

interface Props {
  posts: PostType[]
}

const HomeVolunteer = ({ posts }: Props) => {
  const user = useAppSelector(state => state.auth.user)
  const isOrganization = user?.role === 'ORGANIZATION'

  return (
    isOrganization ? (
      <HomeOrganization />
    ) : (
      <Grid container justifyContent='center' columnGap={8} mt={4}>
        <Grid item container xs='auto' flexDirection='column' spacing={4}>
          {posts.map((item, index) => (
            <Grid item key={item.postId}>
              <Post {...item} key={index} />
            </Grid>
          ))}
        </Grid>

        <Grid item xs='auto'>
          <Box width={480}>
            <FriendList />
          </Box>
        </Grid>
      </Grid>
    )
  )
}

export default HomeVolunteer