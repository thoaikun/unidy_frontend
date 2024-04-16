'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { useAppDispatch } from '@/lib/hook'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { CampaignType } from '@/type/campaign'
import { openDonateModal } from '@/lib/features/modals/donate-modal/donateModalSlice'
import api from '@/service/api'
import { joinCampaign, reactCampaign } from '@/lib/features/campaigns/campaignsSlice'
import { openCampaignDetail } from '@/lib/features/modals/campaign-detail-modal/campaignDetailModalSlice'
import EllipsisText from '../ellipsis-text'

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

  const handleClickLove = useCallback(async () => {
    try {
      await api.patch(`/campaign/${isLiked ? 'cancel-like' : 'like'}?campaignId=${campaignId}`)
      dispatch(reactCampaign({ campaignId, isLiked: !isLiked }))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [dispatch, campaignId, isLiked])

  const handleOpenCampaignDetail = useCallback(() => {
    dispatch(openCampaignDetail(campaignId))
  }, [campaignId, dispatch])

  const handleOpenDonateModal = useCallback(() => {
    dispatch(openDonateModal({
      campaignId,
      organizationUserId: userId,
    }))
  }, [dispatch, campaignId, userId])

  const handleJoinCampaign = useCallback(async () => {
    try {
      await api.patch(`/campaign/register?campaignId=${campaignId}`)
      dispatch(joinCampaign(campaignId))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [campaignId, dispatch])

  return (
    <Card sx={{ borderRadius: 2, py: 1 }}>
      <CardHeader
        avatar={
          <Link href={`/organizations/${userId}`}>
            <Avatar src={profileImageLink || ''} />
          </Link>
        }
        title={
          <Link href={`/organizations/${userId}`}>
            <Typography fontWeight={500}>{fullName}</Typography>
          </Link>
        }
        subheader={<Typography color={theme.palette.text.secondary}>{title}</Typography>}
      />

      <CardContent sx={{ py: 0 }}>
        <EllipsisText text={content} whiteSpace='pre-line' mb={2} />

        <Box height={(imageRef.current?.width || 300) * imageRatio} maxHeight={600} position='relative'>
          <Image
            ref={imageRef}
            src={linkImage ? JSON.parse(linkImage)[0] : '/examples/campaign-media.svg'}
            alt='media'
            fill
            sizes='300px'
            style={{ borderRadius: 8, cursor: 'pointer', objectFit: 'cover' }}
            onClick={handleOpenCampaignDetail}
            onLoad={({ target }: { target: any }) => setImageRatio(target.naturalHeight / target.naturalWidth)}
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
            <IconButton>
              <Image src='/images/dashboard/post-card/comment.svg' alt='comment' width={23} height={20} />
            </IconButton>
            <Typography>0 bình luận</Typography>
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

        <Button fullWidth variant='contained' sx={{ height: 40 }} disabled={Boolean(isJoined)} onClick={handleJoinCampaign}>
          <Typography variant='body2' color='inherit'>{isJoined ? 'Đã tham gia' : 'Tham gia ngay'}</Typography>
        </Button>
      </CardActions>
    </Card>
  )
}

export default Campaign