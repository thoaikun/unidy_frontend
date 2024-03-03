'use client'

import { Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Props {
  data: {
    media: string,
    title: string,
    status: number,
    money: string,
    time: string,
    method: string,
  }
}

const SupportedCard = ({ data }: Props) => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Link href={`/campaign/1`}>
      <Card sx={{ width: 400, boxShadow: 'none', borderRadius: 1, display: 'flex' }}>
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
              border={`1px solid ${theme.palette[data.status < 0 ? 'error' : 'success'][data.status < 0 ? 300 : 600]}`}
              sx={{ backgroundColor: theme.palette[data.status < 0 ? 'error' : 'success'][100], }}>
              <Typography fontSize='0.5rem' color={theme.palette[data.status < 0 ? 'error' : 'success'][data.status < 0 ? 300 : 600]}>
                {data.status === -1 ? 'BỊ LOẠI' : data.status === 0 ? 'ĐÃ ĐÓNG GÓP' : 'HOÀN THÀNH'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='caption' fontWeight={300}>
                Số tiền ủng hộ: <span style={{ color: theme.palette.error[300], fontWeight: 400 }}>
                  {data.money}
                </span>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='caption' fontWeight={300}>
                Thời gian: <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                  {data.time}
                </span>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='caption' fontWeight={300}>
                Phương thức: <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                  {data.method}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  )
}

export default SupportedCard