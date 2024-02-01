import { Box, Grid } from '@mui/material'
import Post from '@/component/post'
import FriendList from '@/component/friend-list'
import { PostType } from '@/type/post'
import { postData } from '@/fakeData/posts'

const fetchPosts = async (): Promise<PostType[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return postData
}

const HomePage = async () => {
  const posts: PostType[] = await fetchPosts()

  return (
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
}

export default HomePage