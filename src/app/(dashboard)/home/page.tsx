import { Grid } from '@mui/material'
import Post from '@/component/post'
import FriendList from '@/component/friend-list'
import { PostType } from '@/type/post'

const data: PostType[] = [
  {
    content: 'Làm là phải làm hết mình, làm tới chết, oke chưa',
    hashtag: ['dieforone'],
    media: '/examples/home-post-1.png',
    loved: true,
    numberLoved: 4,
    numberComments: 10,
    activity: 'Đang cảm thấy hứng thú',
    isEvent: false,
    created: {
      avatar: '/examples/avatar.jpg',
      fullName: 'Thoại Lê Nè',
    },
    createdAt: new Date(),
  },
  {
    content: `Giúp đỡ những đứa trẻ bệnh tim bằng những hành động nhỏ bé, tham gia ngay để tìm thấy những điều hạnh phúc nhỏ bé
              Đừng ngần ngại !!!! Đăng ký ngay`,
    hashtag: ['dieforone'],
    media: '/examples/post-media-2.webp',
    loved: false,
    numberLoved: 4,
    numberComments: 10,
    activity: 'Tổ chức sự kiện mới',
    isEvent: true,
    created: {
      avatar: '/examples/unicef.png',
      fullName: 'Unicef',
    },
    createdAt: new Date(),
  },
]

const HomePage = () => {
  return (
    <Grid container justifyContent='center'>
      <Grid container spacing={10} maxWidth={1840}>
        <Grid item xs maxWidth={1200} container>
          {data.map((item, index) => (
            <Post data={item} key={index} />
          ))}
        </Grid>

        <Grid item width={560}>
          <FriendList />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HomePage