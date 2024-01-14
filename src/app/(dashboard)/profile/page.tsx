'use client'

import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Post from '@/component/post'
import Certificate from '@/component/certificate'
import PersonalInformation from '@/component/personal-information'
import JoinedCard from '@/component/joined-card'
import { PostType } from '@/type/post'

const joinedCardData = [
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: -1,
    time: '1/23/2023 - 3.32AM',
    numberVolunteers: 100,
    maxVolunteers: 120,
  },
  {
    media: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ4caJI8kFtBIEREwR8fQwBFwFGjEgteKogh1wmbSb9a8lNHDRB',
    title: 'Trồng cây gây rừng',
    status: 0,
    time: '1/23/2023 - 3.32AM',
    numberVolunteers: 100,
    maxVolunteers: 120,
  },
  {
    media: 'http://www.news.cn/english/2021-10/26/1310269188_16352106345691n.jpg',
    title: 'Trồng cây gây rừng',
    status: 0,
    time: '1/23/2023 - 3.32AM',
    numberVolunteers: 100,
    maxVolunteers: 120,
  },
  {
    media: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQi7xiogVfM1i8bY5jFoSb_axWThVhT2BySGBt6uFZokDOlmFTz',
    title: 'Trồng cây gây rừng',
    status: 1,
    time: '1/23/2023 - 3.32AM',
    numberVolunteers: 100,
    maxVolunteers: 120,
  },
]

const data: PostType[] = [
  {
    content: 'Làm là phải làm hết mình, làm tới chết, oke chưa',
    hashtag: ['dieforone'],
    media: '/examples/profile-post-1.png',
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
    media: '/examples/profile-post-2.png',
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
        <Card sx={{ borderRadius: 3, position: 'relative' }}>
          <CardMedia
            component='img'
            sx={{ height: 320 }}
            image='examples/profile-cover.png'
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
            <Typography variant='h4' my={3}>Các chiến dịch gần dây</Typography>
            <Grid container width={400} spacing={2.5}>
              {joinedCardData.map((item, index) => (
                <Grid item key={index}>
                  <JoinedCard data={item} size='small' />
                </Grid>
              ))}
            </Grid>
          </>
        }
      </Grid>

      <Grid item xs>
        <Typography variant='h4'>Bài đăng gần đây</Typography>
        {data.map((item, index) => (
          <Post data={item} key={index} />
        ))}
      </Grid>
    </Grid>
  )
}

export default ProfilePage