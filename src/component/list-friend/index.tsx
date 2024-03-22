'use client'

import Image from 'next/image'
import { Avatar, Card, CardContent, Divider, Grid, Typography, useTheme } from '@mui/material'
import { listFriendData } from '@/fakeData/listFriend'
import { FriendType } from '@/type/user'

const ListFriend = () => {
  const theme = useTheme()
  const listFriend: FriendType[] = listFriendData

  return (
    <Card sx={{ width: 1, position: 'sticky', top: 96 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Image src='/images/dashboard/list-friend/trophy.svg' alt='trophy' width={28} height={45} />
          </Grid>

          <Grid item xs container alignItems='center'>
            <Grid item xs={12}>
              <Typography variant='h6'>Huân chương của bạn</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h6' color={theme.palette.warning[400]}>Ông hoàng từ thiện</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ mx: 2 }} />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Typography fontWeight={500}>Bạn bè của bạn</Typography>
          </Grid>

          {listFriend?.map((item, index) => (
            <Grid item container spacing={2} key={index}>
              <Grid item xs='auto'>
                <Avatar src={item.profileImageLink || ''} sx={{ width: 32, height: 32 }} />
              </Grid>
              <Grid item xs container alignItems='center'>
                <Grid item xs={12}>
                  <Typography variant='body2' color={theme.palette.text.primary}>{item.fullName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' color={item.color}>{item.trophy}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ListFriend