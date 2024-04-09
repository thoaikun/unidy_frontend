import { closePostDetail } from "@/lib/features/modals/post-detail-modal/postDetailModalSlice"
import { reactPost } from "@/lib/features/posts/postsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { PostType } from "@/type/post"
import { calculateDifferenceTime } from "@/utils/diff-time"
import { Close } from "@mui/icons-material"
import { Avatar, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Skeleton, Typography, useTheme } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

const PostDetail = () => {
  const theme = useTheme()
  const [postData, setPostData] = useState<PostType>()
  const { open, postId } = useAppSelector((state) => state.postDetailModal)
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      if (postId) {
        try {
          const response = await api.get(`/posts/${postId}`)
          setPostData(response.data[0])
        }
        catch (error: any) {
          toast.error(error.data.error)
        }
      }
    })()
  }, [postId])

  const handleaClickLove = useCallback(async () => {
    try {
      await api.patch(`/posts/${postData?.isLiked ? 'unlike' : 'like'}?postId=${postId}`)
      setPostData((state) => state && ({
        ...state,
        isLiked: !state.isLiked,
        likeCount: state.likeCount + (state.isLiked ? -1 : 1)
      }))
      dispatch(reactPost(postId))
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [dispatch, postId, postData?.isLiked])

  const handleClose = useCallback(() => {
    dispatch(closePostDetail())
  }, [dispatch])

  return (
    <Dialog open={open} maxWidth='lg' fullWidth>
      {postData ? (
        <Grid container spacing={2} overflow='hidden'>
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
            <DialogTitle mt={2}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs='auto'>
                  <Link href={`/volunteers/${postData.userNode.userId}`}>
                    <Avatar src={postData.userNode.profileImageLink || ''} />
                  </Link>
                </Grid>

                <Grid item xs container>
                  <Grid item xs={12} container spacing={2}>
                    <Grid item xs='auto'>
                      <Link href={`/volunteers/${postData.userNode.userId}`}>
                        <Typography fontWeight={500}>{postData.userNode.fullName}</Typography>
                      </Link>
                    </Grid>

                    <Grid item xs container alignItems='center'>
                      <Typography variant='body2' fontWeight={300}>• {calculateDifferenceTime(postData.createDate)}</Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography color={theme.palette.text.secondary}>Đang cảm thấy {postData.status}</Typography>
                  </Grid>
                </Grid>

                <Grid item xs='auto'>
                  <IconButton onClick={handleClose}>
                    <Close sx={{ color: '#000000' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </DialogTitle>

            <DialogContent sx={{ pb: 0 }}>
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
            </DialogContent>

            <DialogActions sx={{ pt: 0, px: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs='auto' container alignItems='center'>
                  <IconButton onClick={handleaClickLove}>
                    <Image src={`/images/dashboard/post-card/${postData?.isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
                  </IconButton>
                  <Typography>{postData.likeCount} lượt thích</Typography>
                </Grid>

                <Grid item xs='auto' container alignItems='center'>
                  <IconButton>
                    <Image src='/images/dashboard/post-card/comment.svg' alt='loved' width={23} height={20} />
                  </IconButton>
                  <Typography>0 bình luận</Typography>
                </Grid>

                <Grid item xs='auto' container alignItems='center'>
                  <IconButton>
                    <Image src='/images/dashboard/post-card/share.svg' alt='loved' width={23} height={20} />
                  </IconButton>
                  <Typography>Chia sẻ</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ borderColor: '#000000' }} />
                </Grid>
              </Grid>
            </DialogActions>

            <DialogContent>
              {/* <Grid container spacing={2} mt={2}>
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
              </Grid> */}
            </DialogContent>
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
                <Image src='/images/dashboard/modal/close.svg' alt='close-icon' width={20} height={20} />
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