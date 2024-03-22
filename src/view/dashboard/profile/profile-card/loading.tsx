import { Box, Card, CardActions, CardContent, Skeleton, Typography } from "@mui/material"

const ProfileCardLoading = () => {
  return (
    <Card sx={{ borderRadius: 3, position: 'relative' }}>
      <Skeleton variant='rounded' height={320} animation='wave' />
      <Skeleton variant='circular' height={156} width={156} animation='wave' sx={{ position: 'absolute', left: 78, bottom: 22 }} />

      <Box ml={33} mb={2}>
        <CardContent>
          <Typography variant='h3'><Skeleton width='50%' animation='wave' /></Typography>
        </CardContent>

        <CardActions>
          <Skeleton variant='rounded' width={210} height={30} animation='wave' />
        </CardActions>
      </Box>
    </Card>
  )
}

export default ProfileCardLoading