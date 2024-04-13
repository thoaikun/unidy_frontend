import { Grid, Skeleton, Typography } from "@mui/material"

const CommentLoading = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs='auto'>
        <Skeleton variant='circular' width={35} height={35} animation='wave' />
      </Grid>
      <Grid item xs>
        <Typography variant='h6'><Skeleton width='50%' animation='wave' /></Typography>
        <Typography variant='body1'><Skeleton width='50%' animation='wave' /></Typography>
      </Grid>
    </Grid>
  )
}

export default CommentLoading