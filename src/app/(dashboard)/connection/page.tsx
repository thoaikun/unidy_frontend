'use client'

import { Avatar, Button, Card, CardHeader, Grid, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

const friendList = [
  {
    media: '/examples/avatar-2.svg',
    name: 'Zy Khùng',
  },
  {
    media: '/examples/avatar-6.svg',
    name: 'Duy Tân',
  },
  {
    media: '/examples/avatar-4.svg',
    name: 'Hoàng Tôn',
  },
]

const ConnectionPage = () => {
  const theme = useTheme()
  const [friendRequests, setFriendRequests] = useState([
    {
      media: '/examples/avatar-2.svg',
      name: 'Lê Trương Ngọc Trang',
    },
    {
      media: '/examples/avatar-3.svg',
      name: 'Phúc Lê',
    },
    {
      media: '/examples/avatar-4.svg',
      name: 'Đặng Hùng Cường',
    },
    {
      media: '/examples/avatar-5.svg',
      name: 'Lê Đình Luân',
    },
  ])

  const [friendRecommends, setFriendRecommends] = useState([
    {
      media: '/examples/avatar-2.svg',
      name: 'Lê Trương Ngọc Trang',
      isSent: false,
    },
    {
      media: '/examples/avatar-3.svg',
      name: 'Phúc Lê',
      isSent: false,
    },
    {
      media: '/examples/avatar-4.svg',
      name: 'Đặng Hùng Cường',
      isSent: true,
    },
    {
      media: '/examples/avatar-5.svg',
      name: 'Lê Đình Luân',
      isSent: false,
    },
  ])

  return (
    <>
      <Grid container width={608} spacing={2.5} mt={2.75}>
        <Grid item>
          <Button endIcon={<Image src='/icons/show-all.svg' alt='show-all' width={5.3} height={10.5} />}>
            <Typography>Lời mời kết bạn</Typography>
          </Button>
        </Grid>
        {friendRequests.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardHeader
                avatar={<Avatar src={item.media} sx={{ width: 45, height: 45 }} />}
                title={<Typography>{item.name}</Typography>}
                action={
                  <Grid container alignItems='center' height={60} columnGap={1.25}>
                    <Button
                      variant='outlined'
                      sx={{ height: 28 }}
                      onClick={() => setFriendRequests(friendRequests.filter((_, idx) => idx !== index))}
                    >
                      <Typography variant='body2' color={theme.palette.text.primary}>Xóa</Typography>
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ height: 28 }}
                      disableElevation
                      onClick={() => setFriendRequests(friendRequests.filter((_, idx) => idx !== index))}
                    >
                      <Typography variant='body2' color={theme.palette.text.contrast}>Đồng ý</Typography>
                    </Button>
                  </Grid>
                }
                sx={{ px: 2.5, py: 1.875 }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container width={608} spacing={2.5} mt={2.5}>
        <Grid item>
          <Button endIcon={<Image src='/icons/show-all.svg' alt='show-all' width={5.3} height={10.5} />}>
            <Typography>Có thể bạn quan tâm</Typography>
          </Button>
        </Grid>
        {friendRecommends.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardHeader
                avatar={<Avatar src={item.media} sx={{ width: 45, height: 45 }} />}
                title={<Typography>{item.name}</Typography>}
                action={
                  <Grid container alignItems='center' height={60}>
                    <Button
                      startIcon={
                        <Image
                          src={`/icons/add-friend${item.isSent ? '-primary' : ''}.svg`}
                          alt='add-friend'
                          width={20}
                          height={20}
                        />
                      }
                      onClick={() =>
                        setFriendRecommends(friendRecommends.map((item, idx) => idx === index ? { ...item, isSent: !item.isSent } : item))
                      }
                    >
                      <Typography
                        variant='body2'
                        color={item.isSent ? theme.palette.primary.main : theme.palette.text.secondary} fontWeight={300}
                      >
                        {item.isSent ? 'Đã gửi' : 'Kết bạn '}
                      </Typography>
                    </Button>
                  </Grid>
                }
                sx={{ px: 2.5, py: 1.875 }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container width={608} spacing={2.5} mt={2.5}>
        <Grid item>
          <Button endIcon={<Image src='/icons/show-all.svg' alt='show-all' width={5.3} height={10.5} />}>
            <Typography>Bạn bè của bạn</Typography>
          </Button>
        </Grid>
        {friendList.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardHeader
                avatar={<Avatar src={item.media} sx={{ width: 45, height: 45 }} />}
                title={<Typography>{item.name}</Typography>}
                action={
                  <Grid container alignItems='center' height={45}>
                    <Button startIcon={<Image src='/icons/friend-primary.svg' alt='friend' width={20} height={20} />}>
                      <Typography variant='body2' color={theme.palette.primary.main} fontWeight={300}>
                        Bạn bè
                      </Typography>
                    </Button>
                  </Grid>
                }
                sx={{ px: 2.5, py: 1.875 }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ConnectionPage