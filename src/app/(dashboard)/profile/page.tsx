'use client'

import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Post from '@/component/post'
import Certificate from '@/component/certificate'
import PersonalInformation from '@/component/personal-information'
import JoinedCard from '@/component/joined-card'
import { PostType } from '@/type/post'

const joinedCardData: {
  media: string
  status: string
  color: 'success' | 'error' | 'info'
}[] = [
    {
      media: '/examples/post-media-2.webp',
      status: 'ĐÃ HỦY',
      color: 'error',
    },
    {
      media: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ4caJI8kFtBIEREwR8fQwBFwFGjEgteKogh1wmbSb9a8lNHDRB',
      status: 'ĐANG ĐIỄN RA',
      color: 'info',
    },
    {
      media: 'http://www.news.cn/english/2021-10/26/1310269188_16352106345691n.jpg',
      status: 'ĐANG ĐIỄN RA',
      color: 'info',
    },
    {
      media: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQi7xiogVfM1i8bY5jFoSb_axWThVhT2BySGBt6uFZokDOlmFTz',
      status: 'ĐÃ KẾT THÚC',
      color: 'success',
    },
  ]

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
      avatar: '/examples/avatar.jpg',
      fullName: 'Thoại Lê Nè',
    },
    createdAt: new Date(),
  },
  {
    content: 'Làm là phải làm hết mình, làm tới chết, oke chưa',
    hashtag: ['dieforone'],
    media: 'http://www.news.cn/english/2021-10/26/1310269188_16352106345691n.jpg',
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
]

const ProfilePage = () => {
  const [isOrganization, setIsOrganization] = useState<boolean>(false)

  useEffect(() => {
    setIsOrganization(localStorage.getItem('type') === 'organization')
  }, [])

  return (
    <Grid container pt={5} spacing={4}>
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 3, position: 'relative', boxShadow: 'none' }}>
          <CardMedia
            component='img'
            sx={{ height: 320 }}
            image='https://sreedharaya.org/imges/5.jpg'
          />

          <Avatar
            src={
              isOrganization ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzVmaJDQj1_VrsSh2ukmxIsiJq1_dR5703M6h5iJkGob9AjmKI' :
                '/examples/avatar.jpg'
            }
            sx={{ width: 156, height: 156, position: 'absolute', left: 78, bottom: 22, border: '1px solid #ffffff' }}
          />

          <Box ml={33} mb={2}>
            <CardContent>
              <Typography variant='h3'>{isOrganization ? 'International Volunteer HQ' : 'Thoại Lê Nè'}</Typography>
            </CardContent>

            <CardActions>
              {isOrganization ? <Button variant='contained' sx={{ width: 210, height: 30 }} disableElevation>Theo dõi</Button> :
                <>
                  <Button variant='contained' sx={{ width: 210, height: 30 }} disableElevation>Nhắn tin</Button>
                  <Button variant='outlined' sx={{ width: 148, height: 30 }}>Xóa kết bạn</Button>
                </>
              }
            </CardActions>
          </Box>
        </Card>
      </Grid>

      <Grid item>
        {!isOrganization && <Certificate />}
        <PersonalInformation isOrganization={isOrganization} />
        {isOrganization &&
          <>
            <Typography variant='h4' mt={3}>Các chiến dịch gần dây</Typography>
            {joinedCardData.map((item, index) => (
              <JoinedCard data={item} key={index} />
            ))}
          </>
        }
      </Grid>

      <Grid item>
        <Typography variant='h4'>Bài đăng gần đây</Typography>
        {data.map((item, index) => (
          <Post data={item} key={index} />
        ))}
      </Grid>
    </Grid>
  )
}

export default ProfilePage