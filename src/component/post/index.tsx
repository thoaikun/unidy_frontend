'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { PostType } from '@/type/post'
import { useAppDispatch } from '@/lib/hook'
import { openPostDetail } from '@/lib/features/modals/modalsSlice'
import DonateModal from '@/view/dashboard/home/home-volunteer/donate-modal'

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

  const [openDonate, setOpenDonate] = useState<boolean>(false)

  const handleOpenDonateModal = useCallback(() => {
    setOpenDonate(true)
  }, [])

  const handleCloseDonateModal = useCallback(() => {
    setOpenDonate(false)
  }, [])

  const handleaClickLove = useCallback(() => {
    // setPostData(prevState => ({ ...prevState, loved: !prevState.loved }))
  }, [])

  const handleOpenPostDetail = useCallback(() => {
    dispatch(openPostDetail('1'))
  }, [dispatch])

  return (
    <>
      <Card sx={{ width: 680, borderRadius: 2, py: 1 }}>
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

          <Image
            src={JSON.parse(linkImage)[0]}
            alt='media'
            width={648}
            height={324}
            style={{ borderRadius: 8, cursor: 'pointer', objectFit: 'cover' }}
            onClick={handleOpenPostDetail}
          />
        </CardContent>

        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs='auto' container alignItems='center'>
              <IconButton onClick={handleaClickLove}>
                <Image src={`/icons/${isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>{likeCount} lượt thích</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton>
                <Image src='/icons/comment.svg' alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>{comments?.length} bình luận</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton>
                <Image src='/icons/share.svg' alt='loved' width={23} height={20} />
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