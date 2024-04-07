import { Grid, Skeleton, Typography } from "@mui/material"

const NotificationLoading = () => {
  return (
    <Grid container>
      <Grid item xs='auto'>
        <Skeleton variant='circular' width={40} height={40} animation='wave' />
      </Grid>

      <Grid item xs container ml={2}>
        <Grid item xs={12}>
          <Typography><Skeleton width='100%' animation='wave' /></Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='caption'>
            <Skeleton width='50%' animation='wave' />
          </Typography>
        </Grid>
      </Grid>
    </Grid >
  )
}

export default NotificationLoading