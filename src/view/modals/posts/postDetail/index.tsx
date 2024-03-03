import { postDetailData } from "@/fakeData/posts"
import { closePostDetail } from "@/lib/features/modals/modalsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material"
import Image from "next/image"
import { useCallback } from "react"

const PostDetail = () => {
  const theme = useTheme()
  const data = useAppSelector(state => state.modals.postDetail)
  const dispatch = useAppDispatch()
  const postDetail = postDetailData

  const handleaClickLove = useCallback(() => {
    // setPostData(prevState => ({ ...prevState, loved: !prevState.loved }))
  }, [])

  const handleClose = useCallback(() => {
    dispatch(closePostDetail())
  }, [dispatch])

  return (
    <Dialog open={data.open} maxWidth='lg' fullWidth>
      <Grid container>
        <Grid item xs='auto'>
          <Image src={postDetail.linkImage} alt='post-detail-image' width={700} height={700} style={{ objectFit: 'cover' }} />
        </Grid>
        <Grid item xs p={2}>
          <Grid container justifyContent='flex-end'>
            <IconButton onClick={handleClose}>
              <Image src='/icons/close.svg' alt='close-icon' width={20} height={20} />
            </IconButton>
          </Grid>
          <Card sx={{ borderRadius: 2 }}>
            <CardHeader
              avatar={<Avatar src={postDetail.userNodes.profileImageLink} />}
              title={
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography fontWeight={500}>{postDetail.userNodes.fullName}</Typography>
                  </Grid>

                  <Grid item xs container alignItems='center'>
                    <Typography variant='body2' fontWeight={300}>• 10m</Typography>
                  </Grid>
                </Grid>
              }
              subheader={<Typography color={theme.palette.text.secondary}>{status}</Typography>}
            />

            <CardContent sx={{ py: 0 }}>
              <Grid container spacing={1} pb={2}>
                <Grid item xs={12}>
                  <Typography whiteSpace='pre-line'>{postDetail.content}</Typography>
                </Grid>

                <Grid item xs={12} container columnGap={1}>
                  {postDetail.hashtag?.map((item, index) => (
                    <Typography fontWeight={500} color={theme.palette.primary.main} key={index}>
                      #{item}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Grid container spacing={2}>
                <Grid item xs='auto' container alignItems='center'>
                  <IconButton onClick={handleaClickLove}>
                    <Image src={`/icons/${postDetail.isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
                  </IconButton>
                  <Typography>{postDetail.likeCount} lượt thích</Typography>
                </Grid>

                <Grid item xs='auto' container alignItems='center'>
                  <IconButton>
                    <Image src='/icons/comment.svg' alt='loved' width={23} height={20} />
                  </IconButton>
                  <Typography>{postDetail.comments?.length} bình luận</Typography>
                </Grid>

                <Grid item xs='auto' container alignItems='center'>
                  <IconButton>
                    <Image src='/icons/share.svg' alt='loved' width={23} height={20} />
                  </IconButton>
                  <Typography>Chia sẻ</Typography>
                </Grid>
              </Grid>
            </CardActions>

            <Divider sx={{ borderColor: '#000000' }} />

            <Grid container spacing={2} mt={2}>
              {postDetail.comments?.map((item, index) => (
                <Grid item container spacing={2} key={index}>
                  <Grid item xs='auto'>
                    <Avatar src={item.userNodes.profileImageLink} sx={{ width: 35, height: 35 }} />
                  </Grid>
                  <Grid item xs container>
                    <Grid item xs={12}>
                      <Typography variant='h6'>{item.userNodes.fullName}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body1'>{item.content}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='caption'>Trả lời</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Dialog >
  )
}

export default PostDetail