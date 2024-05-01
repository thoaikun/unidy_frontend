import { Box, Card, CardActions, CardContent, CardHeader, Grid, Skeleton, Typography } from "@mui/material"

const CampaignCardLoading = () => {
  return (
    <Card sx={{ width: 290, borderRadius: 2, position: 'relative' }}>
      <Skeleton variant='rectangular' width='100%' height={200} animation='wave' />
      <Skeleton variant='circular' width={45} height={45} animation='wave' sx={{ position: 'absolute', top: 178, right: 20 }} />

      <CardHeader title={<Typography><Skeleton width='50%' animation='wave' /></Typography>} />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography variant='caption'><Skeleton width='100%' animation='wave' /></Typography>
            <Typography variant='caption'><Skeleton width='100%' animation='wave' /></Typography>
          </Grid>
          <Grid item xs>
            <Typography variant='caption'><Skeleton width='100%' animation='wave' /></Typography>
            <Typography variant='caption'><Skeleton width='100%' animation='wave' /></Typography>
          </Grid>
          <Grid item xs>
            <Typography variant='caption'><Skeleton width='100%' animation='wave' /></Typography>
            <Typography variant='caption'><Skeleton width='100%' animation='wave' /></Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Skeleton variant='rounded' width='100%' height={29} animation='wave' />
      </CardActions>
    </Card >
  )
}

export default CampaignCardLoading