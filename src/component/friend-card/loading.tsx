import { Card, CardHeader, Grid, Skeleton, Typography } from "@mui/material"


const FriendCardLoading = () => {
  return (
    <Card sx={{ p: 0.5 }}>
      <CardHeader
        avatar={<Skeleton variant='circular' width={45} height={45} animation='wave' />}
        title={<Typography><Skeleton width='50%' animation='wave' /></Typography>}
        action={
          <Grid container alignItems='flex-end' height={45}>
            <Skeleton variant='rounded' width={75} height={30} animation='wave' />
          </Grid>
        }
      />
    </Card>
  )
}

export default FriendCardLoading