'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { Box, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { PostType } from '@/type/post'
import { useAppDispatch } from '@/lib/hook'
import { openPostDetail } from '@/lib/features/modals/post-detail-modal/postDetailModalSlice'
import { toast } from 'react-toastify'
import api from '@/service/api'
import { reactPost } from '@/lib/features/posts/postsSlice'
import { calculateDifferenceTime } from '@/utils/diff-time'
import EllipsisText from '../ellipsis-text'
import UserName from '../user-name'
import UserAvatar from '../user-avatar'

interface Props {
  data: PostType
  onClickLove?: (totalLike: number) => void
}

const Post = ({
  data: {
    postId,
    content,
    status,
    createDate,
    linkImage,
    userNode,
    isLiked,
    likeCount,
    numberComments,
  },
  onClickLove,
}: Props) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageRatio, setImageRatio] = useState<number>(1)

  const handleClickLove = useCallback(async () => {
    try {
      const response = await api.patch(`/posts/${isLiked ? 'unlike' : 'like'}?postId=${postId}`)
      const totalLike = response.data.totalLike
      onClickLove?.(totalLike)
      dispatch(reactPost({ postId, totalLike }))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [dispatch, postId, isLiked, onClickLove])

  const handleOpenPostDetail = useCallback(() => {
    dispatch(openPostDetail(postId))
  }, [dispatch, postId])

  const handleCommentPost = useCallback(() => {
    handleOpenPostDetail()
  }, [handleOpenPostDetail])

  const handleSharePost = useCallback(() => {
    toast.info('Tính năng đang được phát triển')
  }, [])

  return (
    <>
      <Card sx={{ borderRadius: 2, py: 1 }}>
        <CardHeader
          avatar={<UserAvatar data={userNode} />}
          title={
            <Grid container spacing={2}>
              <Grid item xs='auto'>
                <UserName data={userNode} typographyProps={{ fontWeight: 500 }} />
              </Grid>

              <Grid item xs container alignItems='center'>
                <Typography variant='body2' fontWeight={300}>• {calculateDifferenceTime(createDate)}</Typography>
              </Grid>
            </Grid>
          }
          subheader={<Typography color={theme.palette.text.secondary}>Đang cảm thấy {status}</Typography>}
        />

        <CardContent sx={{ py: 0 }}>
          <EllipsisText text={content} whiteSpace='pre-line' mb={2} />

          <Box height={(imageRef.current?.width || 300) * imageRatio} maxHeight={600} position='relative'>
            <Image
              ref={imageRef}
              src={JSON.parse(linkImage)[0]}
              alt='media'
              fill
              sizes='300px'
              style={{ borderRadius: 8, cursor: 'pointer', objectFit: 'cover' }}
              onClick={handleOpenPostDetail}
              onLoad={({ target }: { target: any }) => setImageRatio(target.naturalHeight / target.naturalWidth)}
              priority
            />
          </Box>
        </CardContent>

        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs='auto' container alignItems='center'>
              <IconButton onClick={handleClickLove}>
                <Image src={`/images/dashboard/post-card/${isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>{likeCount} lượt thích</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton onClick={handleCommentPost}>
                <Image src='/images/dashboard/post-card/comment.svg' alt='comment' width={23} height={20} />
              </IconButton>
              <Typography>{numberComments} bình luận</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton onClick={handleSharePost}>
                <Image src='/images/dashboard/post-card/share.svg' alt='share' width={23} height={20} />
              </IconButton>
              <Typography>Chia sẻ</Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  )
}

export default Post