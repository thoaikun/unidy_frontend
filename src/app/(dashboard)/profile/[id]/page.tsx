'use client'

import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Post from '@/component/post'
import Certificate from '@/component/certificate'
import PersonalInformation from '@/component/personal-information'
import JoinedCard from '@/component/joined-card'
import { PostType } from '@/type/post'
import { postData } from '@/fakeData/posts'
import { useAppSelector } from '@/lib/hook'

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

const ProfilePage = () => {
  const user = useAppSelector(state => state.auth.user)
  const isOrganization = user?.role === 'ORGANIZATION'
  const posts: PostType[] = postData

  return (
    <Grid container pt={5} spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 3, position: 'relative' }}>
          <CardMedia
            component='img'
            sx={{ height: 320 }}
            image='/examples/profile-cover.png'
          />

          <Avatar
            src={user?.image}
            sx={{ width: 156, height: 156, position: 'absolute', left: 78, bottom: 22, border: '1px solid #ffffff' }}
          />

          <Box ml={33} mb={2}>
            <CardContent>
              <Typography variant='h3'>{user?.fullName}</Typography>
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

      <Grid item xs={12} container spacing={8}>
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

        <Grid item xs container justifyContent='center'>
          <Grid item xs='auto' container spacing={4} flexDirection='column'>
            <Grid item>
              <Typography variant='h4'>Bài đăng gần đây</Typography>
            </Grid>
            {posts.map((item, index) => (
              <Grid item key={index}>
                <Post {...item} key={index} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfilePage