'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { PostType } from '@/type/post'
import { useAppDispatch } from '@/lib/hook'
import { openPostDetail } from '@/lib/features/modals/postDetailModal/postDetailModalSlice'
import { toast } from 'react-toastify'
import api from '@/service/api'
import { reactPost } from '@/lib/features/posts/postsSlice'
import Link from 'next/link'

interface Props {
  data: PostType
}

const Post = ({ data }: Props) => {
  const {
    postId,
    content,
    status,
    linkImage,
    userNode,
    isLiked,
    likeCount,
    comments,
  } = data
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageRatio, setImageRatio] = useState<number>(1)

  const handleaClickLike = useCallback(async () => {
    try {
      const response = await api.patch(`/posts/${isLiked ? 'unlike' : 'like'}?postId=${postId}`)
      if (response.status === 200) {
        dispatch(reactPost({ postId, isLiked: !isLiked }))
      }
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [dispatch, postId, isLiked])

  const handleOpenPostDetail = useCallback(() => {
    dispatch(openPostDetail(postId))
  }, [dispatch, postId])

  return (
    <>
      <Card sx={{ borderRadius: 2, py: 1 }}>
        <CardHeader
          avatar={
            <Link href={`/profile/${userNode.userId}`}>
              <Avatar src={userNode.profileImageLink || ''} />
            </Link>
          }
          title={
            <Grid container spacing={2}>
              <Grid item>
                <Link href={`/profile/${userNode.userId}`}>
                  <Typography fontWeight={500}>{userNode.fullName}</Typography>
                </Link>
              </Grid>

              <Grid item xs container alignItems='center'>
                <Typography variant='body2' fontWeight={300}>• 10m</Typography>
              </Grid>
            </Grid>
          }
          subheader={<Typography color={theme.palette.text.secondary}>Đang cảm thấy {status}</Typography>}
        />

        <CardContent sx={{ py: 0 }}>
          <Typography whiteSpace='pre-line' mb={2}>{content}</Typography>

          <Grid item xs={12} height={(imageRef.current?.width || 300) * imageRatio} maxHeight={600} position='relative'>
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
          </Grid>
        </CardContent>

        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs='auto' container alignItems='center'>
              <IconButton onClick={handleaClickLike}>
                <Image src={`/images/dashboard/post-card/${isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>{likeCount} lượt thích</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton>
                <Image src='/images/dashboard/post-card/comment.svg' alt='comment' width={23} height={20} />
              </IconButton>
              <Typography>{comments?.length || 69} bình luận</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton>
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