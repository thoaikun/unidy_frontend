import { postDetailData } from "@/fakeData"
import { closePostDetail } from "@/lib/features/modals/modalsSlice"
import { reactPost } from "@/lib/features/posts/postsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { CustomPostType } from "@/type/post"
import { Avatar, Card, CardActions, CardContent, CardHeader, Dialog, Divider, Grid, IconButton, Skeleton, Typography, useTheme } from "@mui/material"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

const PostDetail = () => {
  const theme = useTheme()
  const [postData, setPostData] = useState<CustomPostType>()
  const { open, postId } = useAppSelector(state => state.modals.postDetail)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const getPostData = useCallback(async () => {
    try {
      const response = await api.get('/posts/get-post-by-postId', {
        params: {
          postId,
        }
      })
      setPostData(response.data[0])
      // setPostData(postDetailData)
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [postId])

  useEffect(() => {
    getPostData()
  }, [getPostData])

  const isLiked = postData?.userLikes?.find((item) => item.userId === user?.userId)
  const handleaClickLove = useCallback(async () => {
    try {
      const response = await api.patch(`/posts/${isLiked ? 'unlike' : 'like'}?postId=${postId}`)
      if (response.status === 200) {
        await getPostData()
        dispatch(reactPost({ postId, isLiked: !isLiked }))
      }
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [dispatch, postId, getPostData, isLiked])

  const handleClose = useCallback(() => {
    dispatch(closePostDetail())
  }, [dispatch])

  return (
    <Dialog open={open} maxWidth='lg' fullWidth>
      {postData ? (
        <Grid container spacing={2}>
          <Grid item xs='auto' height={716}>
            <Image
              src={JSON.parse(postData.linkImage)[0]}
              alt='post-detail-image'
              width={700}
              height={700}
              style={{ objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs>
            <Grid container justifyContent='flex-end' p={2}>
              <IconButton onClick={handleClose}>
                <Image src='/images/dashboard/modal/close.svg' alt='close-icon' width={20} height={20} />
              </IconButton>
            </Grid>
            <Card>
              <CardHeader
                avatar={<Avatar src={postData.userNode.profileImageLink || ''} />}
                title={
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography fontWeight={500}>{postData.userNode.fullName}</Typography>
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
                    <Typography whiteSpace='pre-line'>{postData.content}</Typography>
                  </Grid>

                  {/* <Grid item xs={12} container columnGap={1}>
                  {postData.hashtag?.map((item, index) => (
                    <Typography fontWeight={500} color={theme.palette.primary.main} key={index}>
                      #{item}
                    </Typography>
                  ))}
                </Grid> */}
                </Grid>
              </CardContent>

              <CardActions>
                <Grid container spacing={2}>
                  <Grid item xs='auto' container alignItems='center'>
                    <IconButton onClick={handleaClickLove}>
                      <Image src={`/icons/${isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
                    </IconButton>
                    <Typography>{postData.userLikes?.length} lượt thích</Typography>
                  </Grid>

                  <Grid item xs='auto' container alignItems='center'>
                    <IconButton>
                      <Image src='/icons/comment.svg' alt='loved' width={23} height={20} />
                    </IconButton>
                    <Typography>{postData.comments?.length} bình luận</Typography>
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
                {postData.comments?.map((item, index) => (
                  <Grid item container spacing={2} key={index}>
                    <Grid item xs='auto'>
                      <Avatar src={item.userNode.profileImageLink} sx={{ width: 35, height: 35 }} />
                    </Grid>
                    <Grid item xs container>
                      <Grid item xs={12}>
                        <Typography variant='h6'>{item.userNode.fullName}</Typography>
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
      ) : (
        <Grid container spacing={2}>
          <Grid item xs='auto'>
            <Skeleton variant='rounded' width={700} height={700} animation='wave' />
          </Grid>
          <Grid item xs>
            <Grid container justifyContent='flex-end' p={2}>
              <IconButton onClick={handleClose}>
                <Image src='/icons/close.svg' alt='close-icon' width={20} height={20} />
              </IconButton>
            </Grid>
            <Skeleton variant='rounded' width='100%' height={632} animation='wave' />
          </Grid>
        </Grid>
      )}
    </Dialog >
  )
}

export default PostDetail