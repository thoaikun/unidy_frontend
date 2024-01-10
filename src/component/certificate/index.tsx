'use client'

import Image from 'next/image'
import { Card, CardContent, Divider, Grid, Theme, Typography, useTheme } from '@mui/material'

const getData = (theme: Theme) => ({
  trophy: 'Ông hoàng từ thiện',
  color: theme.palette.warning[400],
  history: [
    {
      media: '/icons/green-rank.svg',
      tilte: 'Hiến máu nhân đạo',
      location: 'Đại học bách khoa',
    },
    {
      media: '/icons/gray-rank.svg',
      tilte: 'Phát cháo từ thiện',
      location: 'Bệnh viện Truyền máu huyết học',
    },
    {
      media: '/icons/blue-rank.svg',
      tilte: 'Góp quỹ vắc xin Covid 19',
      location: 'Nhà',
    },
    {
      media: '/icons/gray-rank.svg',
      tilte: 'Hỗ trợ quán cơm từ thiện',
      location: 'Quán cơm từ thiện số 24',
    },
  ],
})

const Certificate = () => {
  const theme = useTheme()
  const data = getData(theme)

  return (
    <Card sx={{ width: 480, mb: 3, px: 2 }}>
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
            <Typography fontWeight={500}>Các hoạt động đã tham gia</Typography>
          </Grid>

          {data.history.map((item, index) => (
            <Grid item container spacing={2} key={index}>
              <Grid item xs='auto'>
                <Image src={item.media} alt='trophy' width={32} height={32} />
              </Grid>

              <Grid item xs container alignItems='center'>
                <Grid item xs={12}>
                  <Typography variant='body2' color={theme.palette.text.primary}>{item.tilte}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='body2'>Tại: {item.location}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Certificate