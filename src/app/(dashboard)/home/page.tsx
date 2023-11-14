import { Grid } from '@mui/material'
import Post from '@/component/post'
import FriendList from '@/component/friend-list'
import { PostType } from '@/type/post'


const data: PostType[] = [
  {
    content: 'Làm là phải làm hết mình, làm tới chết, oke chưa',
    hashtag: ['dieforone'],
    media: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F614376329%2F122656864645%2F1%2Foriginal.20231005-223301?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C331%2C1958%2C979&s=997f7eda4e86b2781e7341acfa956cd3',
    loved: true,
    numberLoved: 4,
    numberComments: 10,
    activity: 'Đang cảm thấy hứng thú',
    isEvent: false,
    created: {
      avatar: 'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/286182314_3223268577951705_5110958408595831979_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FRuC7JY9vXEAX-Es7yY&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBCFwnmNnmq9z-VDLsavSrRLRJ_mG0lLLxi_FmydX96DQ&oe=6557E4BA',
      fullName: 'Thoại Lê Nè',
    },
    createdAt: new Date(),
  },
  {
    content: `Giúp đỡ những đứa trẻ bệnh tim bằng những hành động nhỏ bé, tham gia ngay để tìm thấy những điều hạnh phúc nhỏ bé
              Đừng ngần ngại !!!! Đăng ký ngay`,
    hashtag: ['dieforone'],
    media: 'https://cdn-jimnf.nitrocdn.com/pjSWIGuBjqVANVUtnFQGdvayJJWOXTfR/assets/images/optimized/rev-ea5a786/vomo.org/wp-content/uploads/2023/07/voliunteer-planting.jpg',
    loved: false,
    numberLoved: 4,
    numberComments: 10,
    activity: 'Tổ chức sự kiện mới',
    isEvent: true,
    created: {
      avatar: 'https://getinthepicture.org/sites/default/files/images/partner/logos/unicef.png',
      fullName: 'Unicef',
    },
    createdAt: new Date(),
  },
]

const HomePage = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs container>
        {data.map((item, index) => (
          <Post data={item} key={index} />
        ))}
      </Grid>

      <Grid item xs>
        <FriendList />
      </Grid>
    </Grid>
  )
}

export default HomePage