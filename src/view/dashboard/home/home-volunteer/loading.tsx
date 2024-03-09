import { Box, Card, CardContent, CardHeader, Divider, Grid, Skeleton, Typography } from '@mui/material'

const HomeVolunteerLoading = () => {
  return (
    <Grid container justifyContent='center' columnGap={8} mt={4}>
      <Grid item container xs='auto'>
        <Card sx={{ width: 680, borderRadius: 2, py: 1 }}>
          <CardHeader
            avatar={<Skeleton variant='circular' width={40} height={40} />}
            title={<Skeleton width='50%' />}
            subheader={<Skeleton width='50%' />}
          />

          <CardContent sx={{ py: 0 }}>
            <Skeleton variant='rounded' height={58} sx={{ mb: 2 }} />
            <Skeleton variant='rounded' width={648} height={324} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs='auto'>
        <Box width={480}>
          <Card sx={{ width: 480, position: 'absolute' }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item>
                  <Skeleton variant='rounded' width={28} height={45} />
                </Grid>

                <Grid item xs alignItems='center'>
                  <Skeleton width='50%' />
                  <Skeleton width='50%' />
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
                    <Skeleton variant='circular' width={32} height={32} />
                  </Grid>
                  <Grid item xs alignItems='center'>
                    <Skeleton width='50%' />
                    <Skeleton width='50%' />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}

export default HomeVolunteerLoading