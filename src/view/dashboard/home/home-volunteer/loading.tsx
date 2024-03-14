import { Box, Card, CardContent, CardHeader, Divider, Grid, Skeleton, Typography } from '@mui/material'

const HomeVolunteerLoading = () => {
  return (
    <Grid container justifyContent='center' columnGap={8} mt={4}>
      <Grid item container xs='auto'>
        <Card sx={{ width: 680, borderRadius: 2, py: 1 }}>
          <CardHeader
            avatar={<Skeleton variant='circular' width={40} height={40} animation='wave' />}
            title={<Skeleton width='50%' animation='wave' />}
            subheader={<Skeleton width='50%' animation='wave' />}
          />

          <CardContent sx={{ py: 0 }}>
            <Skeleton variant='rounded' height={58} sx={{ mb: 2 }} animation='wave' />
            <Skeleton variant='rounded' width={648} height={324} animation='wave' />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs='auto' display={{ xs: 'none', lg: 'block' }}>
        <Card sx={{ width: 480, position: 'sticky', top: 96 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item>
                <Skeleton variant='rounded' width={28} height={45} animation='wave' />
              </Grid>

              <Grid item xs alignItems='center'>
                <Skeleton width='50%' animation='wave' />
                <Skeleton width='50%' animation='wave' />
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ mx: 2 }} />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
                <Typography fontWeight={500}>Bạn bè của bạn</Typography>
              </Grid>

              <Grid item container spacing={2}>
                <Grid item xs='auto'>
                  <Skeleton variant='circular' width={32} height={32} animation='wave' />
                </Grid>
                <Grid item xs alignItems='center'>
                  <Skeleton width='50%' animation='wave' />
                  <Skeleton width='50%' animation='wave' />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default HomeVolunteerLoading