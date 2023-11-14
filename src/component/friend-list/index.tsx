'use client'

import Image from 'next/image'
import { Avatar, Card, CardContent, Divider, Grid, Theme, Typography, useTheme } from '@mui/material'

const getData = (theme: Theme) => ({
  trophy: 'Ông hoàng từ thiện',
  color: theme.palette.warning[400],
  listFriend: [
    {
      fullName: 'Lê Trương Ngọc Trang',
      avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRlqicyHSn-Eoya7ZmC3E0TmkQwyBTvE-9EnTxoc7CmB6-UIKy5',
      trophy: 'Nhà tài phiệt',
      color: '#E17AB3',
    },
    {
      fullName: 'Nguyễn Tuyết Vy',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQErqDm8xrlikREfUwQuCk8ZP2cpEM-dEA9OlUs6EfSJAKCgKVw',
      trophy: 'Thần từ thiện',
      color: theme.palette.primary.main,
    },
    {
      fullName: 'Trương Huy Thái',
      avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSVJaOMaLOdJeQ2b5juq8oLd_WdTLuamNGz9g99E9Apgjy0GUY6',
      trophy: 'Binh nhì từ thiện',
      color: theme.palette.info.main,
    },
    {
      fullName: 'Trương Huy Thái',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4Lc84SIuuwDdBVNM5biJiU4skcV3e4vyf1FK6-LLaHq-am4I',
      trophy: 'Chiến thân tình cảm',
      color: theme.palette.success[600],
    },
  ],
})

const FriendList = () => {
  const theme = useTheme()
  const data = getData(theme)

  return (
    <Card sx={{ width: 480, mt: 4, boxShadow: 'none', px: 2, position: 'absolute' }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Image src='/icons/trophy.svg' alt='trophy' width={28} height={45} />
          </Grid>

          <Grid item xs container alignItems='center'>
            <Grid item xs={12}>
              <Typography variant='h6'>Huân chương của bạn</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h6' color={data.color}>{data.trophy}</Typography>
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

          {data.listFriend.map((item, index) => (
            <Grid item container spacing={2} key={index}>
              <Grid item xs='auto'>
                <Avatar src={item.avatar} sx={{ width: 32, height: 32 }} />
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

export default FriendList