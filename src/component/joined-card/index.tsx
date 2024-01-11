'use client'

import { Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material'

interface Props {
  data: {
    media: string,
    title: string,
    status: number,
    time: string,
    numberVolunteers: number,
    maxVolunteers: number,
  },
  size?: 'small' | 'medium'
}

const JoinedCard = ({ data, size = 'medium' }: Props) => {
  const theme = useTheme()

  return (
    <Card sx={{ width: size === 'medium' ? 400 : 360, boxShadow: 'none', borderRadius: 1, display: 'flex' }}>
      <CardMedia component='img' image={data.media} sx={{ width: 150 }} />

      <CardContent>
        <Grid container alignItems='center'>
          <Grid item xs={12}>
            <Typography fontWeight={500}>{data.title}</Typography>
          </Grid>

          <Grid
            item
            xs='auto'
            container
            alignItems='center'
            px={1}
            my={1}
            borderRadius={1}
            height={18}
            border={`1px solid ${theme.palette[data.status < 0 ? 'error' : data.status > 0 ? 'success' : 'info'][data.status < 0 ? 300 : data.status > 0 ? 600 : 500]}`}
            sx={{ backgroundColor: theme.palette[data.status < 0 ? 'error' : data.status > 0 ? 'success' : 'info'][data.status === 0 ? 200 : 100], }}>
            <Typography fontSize='0.5rem' color={theme.palette[data.status < 0 ? 'error' : data.status > 0 ? 'success' : 'info'][data.status < 0 ? 300 : data.status > 0 ? 600 : 500]}>
              {data.status < 0 ? 'ĐÃ HỦY' : data.status > 0 ? 'ĐÃ KẾT THÚC' : 'ĐANG ĐIỄN RA'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' fontWeight={300}>
              Đăng ký lúc: <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                {data.time}
              </span>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' fontWeight={300}>
              Tình nguyện viên <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                {data.numberVolunteers}/{data.maxVolunteers} người
              </span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default JoinedCard