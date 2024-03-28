import Image from 'next/image'
import { Card, CardContent, Divider, Grid, Skeleton, Typography } from '@mui/material'

const LoadingListFriends = () => {
  return (
    <Card sx={{ width: 480, position: 'sticky', top: 96 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs='auto'>
            <Image src='/images/dashboard/list-friends/trophy.svg' alt='trophy' width={28} height={45} />
          </Grid>

          <Grid item xs container alignItems='center'>
            <Grid item xs={12}>
              <Typography variant='h6'>Huân chương của bạn</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h6'><Skeleton width='50%' animation='wave' /></Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ mx: 2 }} />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography fontWeight={500}>Bạn bè của bạn</Typography>
          </Grid>


          <Grid item xs={12} container spacing={2}>
            <Grid item xs='auto'>
              <Skeleton variant='circular' width={32} height={32} animation='wave' />
            </Grid>
            <Grid item xs container alignItems='center'>
              <Grid item xs={12}>
                <Typography variant='body2'><Skeleton width='50%' animation='wave' /></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2'><Skeleton width='50%' animation='wave' /></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LoadingListFriends