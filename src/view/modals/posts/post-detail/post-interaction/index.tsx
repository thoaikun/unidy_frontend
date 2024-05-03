import Comment from "@/component/comment"
import CommentLoading from "@/component/comment/loading"
import EllipsisText from "@/component/ellipsis-text"
import NewComment from "@/component/new-comment"
import { theme } from "@/component/theme"
import UserAvatar from "@/component/user-avatar"
import UserName from "@/component/user-name"
import { closePostDetail } from "@/lib/features/modals/post-detail-modal/postDetailModalSlice"
import { reactPost } from "@/lib/features/posts/postsSlice"
import { useAppDispatch } from "@/lib/hook"
import api from "@/service/api"
import { CommentType } from "@/type/comment"
import { PostType } from "@/type/post"
import { calculateDifferenceTime } from "@/utils/diff-time"
import { Box, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from "@mui/material"
import Image from "next/image"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  data: PostType
  setData: Dispatch<SetStateAction<PostType | undefined>>
}

const PostInteraction = ({ data: { postId, userNode, createDate, status, content, isLiked, likeCount, numberComments }, setData }: Props) => {
  const dispatch = useAppDispatch()
  const [comments, setComments] = useState<CommentType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/posts/${postId}/comments`, {
          params: {
            skip: 0,
            limit: 99,
          }
        })

        setComments(response.data)
        setIsLoading(false)
      }
      catch (error: any) {
        toast.error(error?.data?.error)
      }
    })()
  }, [postId])

  const handleClose = useCallback(() => {
    dispatch(closePostDetail())
  }, [dispatch])

  const handleClickLove = useCallback(async () => {
    try {
      const response = await api.patch(`/posts/${isLiked ? 'unlike' : 'like'}?postId=${postId}`)
      const totalLike = response.data.totalLike
      setData((state) => state && ({
        ...state,
        isLiked: !state.isLiked,
        likeCount: totalLike
      }))
      dispatch(reactPost({ postId, totalLike }))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [dispatch, postId, isLiked, setData])

  const handleSharePost = useCallback(() => {
    toast.info('Tính năng đang được phát triển')
  }, [])

  return (
    <Grid container height={1} flexDirection='column'>
      <Box flex={1} sx={{ overflow: 'auto' }}>
        <DialogTitle mt={2}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs='auto'>
              <UserAvatar data={userNode} onClick={handleClose} />
            </Grid>

            <Grid item xs container>
              <Grid item xs={12} container spacing={2}>
                <Grid item xs='auto'>
                  <UserName data={userNode} typographyProps={{ fontWeight: 500 }} onClick={handleClose} />
                </Grid>

                <Grid item xs container alignItems='center'>
                  <Typography variant='body2' fontWeight={300}>• {calculateDifferenceTime(createDate)}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography color={theme.palette.text.secondary}>Đang cảm thấy {status}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <EllipsisText text={content} whiteSpace='pre-line' />
        </DialogContent>

        <DialogActions sx={{ pt: 0, px: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs='auto' container alignItems='center'>
              <IconButton onClick={handleClickLove}>
                <Image src={`/images/dashboard/post-card/${isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>{likeCount} lượt thích</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton disabled>
                <Image src='/images/dashboard/post-card/comment.svg' alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>{numberComments} bình luận</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton onClick={handleSharePost}>
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
          {isLoading ? (
            <CommentLoading />
          ) : (
            <Grid container spacing={2}>
              {comments?.map((comment) => (
                <Grid item xs={12} key={comment.comment.commentId}>
                  <Comment data={comment} postId={postId} />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Box>

      <NewComment postId={postId} setComments={setComments} />
    </Grid >
  )
}

export default PostInteraction