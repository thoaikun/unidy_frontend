import { Card, CardContent, CardMedia, Grid, Skeleton, Typography } from '@mui/material'

const TransactionCardLoading = () => {
  return (
    <Card sx={{ boxShadow: 'none', borderRadius: 1, display: 'flex' }}>
      <CardMedia>
        <Skeleton variant='rectangular' width={150} height='100%' animation='wave' />
      </CardMedia>

      <CardContent sx={{ width: 1 }}>
        <Grid container alignItems='center'>
          <Grid item xs={12}>
            <Typography fontWeight={500}><Skeleton width='50%' animation='wave' /></Typography>
          </Grid>

          <Grid item xs={12} my={1}>
            <Skeleton variant='rounded' width={62} height={18} animation='wave' />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' fontWeight={300}>
              <Skeleton width='50%' animation='wave' />
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' fontWeight={300}>
              <Skeleton width='50%' animation='wave' />
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' fontWeight={300}>
              <Skeleton width='50%' animation='wave' />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TransactionCardLoading