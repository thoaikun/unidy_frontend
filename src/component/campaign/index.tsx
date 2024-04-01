'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { useAppDispatch } from '@/lib/hook'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { CampaignType } from '@/type/campaign'
import { openDonateModal } from '@/lib/features/modals/donateModal/donateModalSlice'
import api from '@/service/api'
import { reactCampaign } from '@/lib/features/campaigns/campaignsSlice'

interface Props {
  data: CampaignType
}

const Campaign = ({ data }: Props) => {
  const {
    campaign: {
      campaignId,
      title,
      hashTag,
      content,
      linkImage,
    },
    organizationNode: {
      userId,
      fullName,
      profileImageLink,
    },
    likeCount,
    isLiked,
    isJoined
  } = data
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageRatio, setImageRatio] = useState<number>(1)

  const handleClickLike = useCallback(async () => {
    try {
      const response = await api.patch(`/campaign/${isLiked ? 'cancel-like' : 'like'}?campaignId=${campaignId}`)
      if (response.status === 200) {
        dispatch(reactCampaign({ campaignId, isLiked: !isLiked }))
      }
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [dispatch, campaignId, isLiked])

  const handleOpenPostDetail = useCallback(() => {
    toast.info('Tính năng đang được phát triển')
  }, [])

  const handleOpenDonateModal = useCallback(() => {
    dispatch(openDonateModal({
      campaignId,
      organizationUserId: userId,
    }))
  }, [dispatch, campaignId, userId])

  const handleJoinCampaign = useCallback(() => {
    toast.info('Tính năng đang được phát triển')
  }, [])

  return (
    <Card sx={{ borderRadius: 2, py: 1 }}>
      <CardHeader
        avatar={
          <Link href={`/profile/${userId}`}>
            <Avatar src={profileImageLink || ''} />
          </Link>
        }
        title={
          <Grid container spacing={2}>
            <Grid item>
              <Link href={`/profile/${userId}`}>
                <Typography fontWeight={500}>{fullName}</Typography>
              </Link>
            </Grid>

            <Grid item xs container alignItems='center'>
              <Typography variant='body2' fontWeight={300}>• 10m</Typography>
            </Grid>
          </Grid>
        }
        subheader={<Typography color={theme.palette.text.secondary}>{title}</Typography>}
      />

      <CardContent sx={{ py: 0 }}>
        <Grid container spacing={1} mb={2}>
          <Grid item xs={12}>
            <Typography whiteSpace='pre-line'>{content}</Typography>
          </Grid>

          <Grid item xs={12} container columnGap={1}>
            {hashTag?.map((item, index) => (
              <Typography fontWeight={500} color={theme.palette.text.disabled} key={index}>
                #{item}
              </Typography>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} height={(imageRef.current?.width || 300) * imageRatio} maxHeight={600} position='relative'>
          <Image
            ref={imageRef}
            src={linkImage ? JSON.parse(linkImage)[0] : '/examples/campaign-media.svg'}
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
            <IconButton onClick={handleClickLike}>
              <Image src={`/images/dashboard/post-card/${isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
            </IconButton>
            <Typography>{likeCount} lượt thích</Typography>
          </Grid>

          <Grid item xs='auto' container alignItems='center'>
            <IconButton>
              <Image src='/images/dashboard/post-card/comment.svg' alt='comment' width={23} height={20} />
            </IconButton>
            <Typography>69 bình luận</Typography>
          </Grid>

          <Grid item xs='auto' container alignItems='center'>
            <IconButton>
              <Image src='/images/dashboard/post-card/share.svg' alt='share' width={23} height={20} />
            </IconButton>
            <Typography>Chia sẻ</Typography>
          </Grid>
        </Grid>
      </CardActions>
      <CardActions>
        <Button fullWidth variant='outlined' sx={{ height: 40 }} onClick={handleOpenDonateModal}>
          <Typography variant='body2' color={theme.palette.text.primary}>Ủng hộ</Typography>
        </Button>

        <Button fullWidth variant='contained' sx={{ height: 40 }} disabled={isJoined} onClick={handleJoinCampaign}>
          <Typography variant='body2' color='inherit'>{isJoined ? 'Đã tham gia' : 'Tham gia ngay'}</Typography>
        </Button>
      </CardActions>
    </Card>
  )
}

export default Campaign