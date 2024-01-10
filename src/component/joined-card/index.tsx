'use client'

import { Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material'

interface Props {
  data: {
    media: string
    status: string
    color: 'success' | 'error' | 'info'
  }
}

const JoinedCard = ({ data }: Props) => {
  const theme = useTheme()

  return (
    <Card sx={{ width: 480, mt: 3, borderRadius: 1, display: 'flex' }}>
      <CardMedia component='img' image={data.media} sx={{ width: 150 }} />

      <CardContent>
        <Grid container alignItems='center'>
          <Grid item xs={12}>
            <Typography fontWeight={500}>Trồng cây gây rừng</Typography>
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
            border={`1px solid ${theme.palette[data.color].main}`}
            sx={{ backgroundColor: theme.palette[data.color][200], }}>
            <Typography fontSize='0.5rem' color={theme.palette[data.color].main}>{data.status}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' fontWeight={300}>
              Đăng ký lúc: <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                1/23/2023 - 3.32AM
              </span>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' fontWeight={300}>
              Tình nguyện viên <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                100/120 người
              </span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default JoinedCard