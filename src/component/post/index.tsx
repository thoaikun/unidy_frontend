'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { PostType } from '@/type/post'
import { useAppDispatch } from '@/lib/hook'
import { openPostDetail } from '@/lib/features/modals/modalsSlice'
import DonateModal from '@/view/dashboard/home/home-volunteer/donate-modal'
import { toast } from 'react-toastify'
import api from '@/service/api'
import { reactPost } from '@/lib/features/posts/postsSlice'

interface Props {
  data: PostType
}

const Post = ({ data }: Props) => {
  const {
    postId,
    content,
    // hashtag,
    status,
    createDate,
    updateDate,
    isBlock,
    linkImage,
    userNodes,
    isLiked,
    likeCount,
    comments,
    isEvent,
  } = data
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageRatio, setImageRatio] = useState<number>(1)
  const [openDonate, setOpenDonate] = useState<boolean>(false)

  const handleOpenDonateModal = useCallback(() => {
    setOpenDonate(true)
  }, [])

  const handleCloseDonateModal = useCallback(() => {
    setOpenDonate(false)
  }, [])

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
          avatar={<Avatar src={userNodes.profileImageLink || ''} />}
          title={
            <Grid container spacing={2}>
              <Grid item>
                <Typography fontWeight={500}>{userNodes.fullName}</Typography>
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
              <Typography whiteSpace='pre-line'>{content}</Typography>
            </Grid>

            {/* <Grid item xs={12} container columnGap={1}>
              {hashtag?.map((item, index) => (
                <Typography fontWeight={500} color={theme.palette.text.disabled} key={index}>
                  #{item}
                </Typography>
              ))}
            </Grid> */}
          </Grid>

          <Grid item xs={12} height={(imageRef.current?.width || 1) * imageRatio} position='relative'>
            <Image
              ref={imageRef}
              src={JSON.parse(linkImage)[0]}
              alt='media'
              fill
              sizes='300px'
              style={{ borderRadius: 8, cursor: 'pointer', objectFit: 'cover' }}
              onClick={handleOpenPostDetail}
              onLoad={({ target }: { target: any }) => setImageRatio(target.naturalHeight / target.naturalWidth)}
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
              <Typography>{comments?.length} bình luận</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton>
                <Image src='/images/dashboard/post-card/share.svg' alt='share' width={23} height={20} />
              </IconButton>
              <Typography>Chia sẻ</Typography>
            </Grid>
          </Grid>
        </CardActions>
        {isEvent &&
          <CardActions>
            <Button fullWidth variant='outlined' sx={{ height: 40 }} onClick={handleOpenDonateModal}>
              <Typography variant='body2' color={theme.palette.text.primary}>Ủng hộ</Typography>
            </Button>

            <Button fullWidth variant='contained' sx={{ height: 40 }}>
              <Typography variant='body2' color='inherit'>Tham gia ngay</Typography>
            </Button>
          </CardActions>
        }
      </Card>

      <DonateModal open={openDonate} id={postId} onClose={handleCloseDonateModal} />
    </>
  )
}

export default Post