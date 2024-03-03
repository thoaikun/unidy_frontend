import { PostType } from '@/type/post'
import { postData } from '@/fakeData/posts'
import HomeVolunteer from '@/view/home/home-volunteer'

const fetchPosts = async (): Promise<PostType[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return postData
}

const HomePage = async () => {
  const posts: PostType[] = await fetchPosts()

  return (
    <HomeVolunteer posts={posts} />
  )
}

export default HomePage