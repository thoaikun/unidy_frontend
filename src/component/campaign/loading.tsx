import { Card, CardContent, CardHeader, Skeleton } from "@mui/material"

const PostLoading = () => {
  return (
    <Card sx={{ borderRadius: 2, py: 1 }}>
      <CardHeader
        avatar={<Skeleton variant='circular' width={40} height={40} animation='wave' />}
        title={<Skeleton width='50%' animation='wave' />}
        subheader={<Skeleton width='50%' animation='wave' />}
      />

      <CardContent sx={{ py: 0 }}>
        <Skeleton variant='rounded' height={58} sx={{ mb: 2 }} animation='wave' />
        <Skeleton variant='rounded' width='100%' height={300} animation='wave' />
      </CardContent>
    </Card>
  )
}

export default PostLoading