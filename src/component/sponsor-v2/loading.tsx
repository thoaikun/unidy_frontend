import { Divider, Grid, Skeleton, Typography } from "@mui/material"

const SponsorV2Loading = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs='auto'>
        <Skeleton variant='circular' width={40} height={40} animation='wave' />
      </Grid>
      <Grid item xs container alignItems='center'>
        <Typography width={1}><Skeleton width='80%' animation='wave' /></Typography>
      </Grid>
      <Grid item xs='auto' container alignItems='center'>
        <Typography><Skeleton width={100} animation='wave' /></Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  )
}

export default SponsorV2Loading