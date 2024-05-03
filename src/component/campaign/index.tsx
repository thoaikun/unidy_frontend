'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { useAppDispatch } from '@/lib/hook'
import { toast } from 'react-toastify'
import { CampaignType } from '@/type/campaign'
import { openDonateModal } from '@/lib/features/modals/donate-modal/donateModalSlice'
import api from '@/service/api'
import { joinCampaign, reactCampaign } from '@/lib/features/campaigns/campaignsSlice'
import { openCampaignDetail } from '@/lib/features/modals/campaign-detail-modal/campaignDetailModalSlice'
import EllipsisText from '../ellipsis-text'
import UserAvatar from '../user-avatar'
import UserName from '../user-name'
import { openJoinCampaignModal } from '@/lib/features/modals/join-campaign/joinCampaignModalSlice'

interface Props {
  data: CampaignType
  onClickLove?: (totalLike: number) => void
}

const Campaign = ({
  data: {
    campaign: {
      campaignId,
      title,
      // hashTag,
      content,
      linkImage,
    },
    organizationNode,
    likeCount,
    isLiked,
    isJoined,
    joinedStatus,
    numberComments,
  },
  onClickLove,
}: Props) => {
  const { userId } = organizationNode
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageRatio, setImageRatio] = useState<number>(1)

  const handleClickLove = useCallback(async () => {
    try {
      const response = await api.patch(`/campaign/${campaignId}/${isLiked ? 'unlike' : 'like'}`)
      const totalLike = response.data.totalLike
      onClickLove?.(totalLike)
      dispatch(reactCampaign({ campaignId, totalLike }))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [dispatch, campaignId, isLiked, onClickLove])

  const handleOpenCampaignDetail = useCallback(() => {
    dispatch(openCampaignDetail(campaignId))
  }, [campaignId, dispatch])

  const handleOpenDonateModal = useCallback(() => {
    dispatch(openDonateModal({
      campaignId,
      organizationUserId: userId,
    }))
  }, [dispatch, campaignId, userId])

  const handleCommentCampaign = useCallback(() => {
    handleOpenCampaignDetail()
  }, [handleOpenCampaignDetail])

  const handleShareCampaign = useCallback(() => {
    toast.info('Tính năng đang được phát triển')
  }, [])

  const handleJoinCampaign = useCallback(async () => {
    dispatch(openJoinCampaignModal(campaignId))
  }, [campaignId, dispatch])

  return (
    <Card sx={{ borderRadius: 2, py: 1 }}>
      <CardHeader
        avatar={<UserAvatar data={organizationNode} />}
        title={<UserName data={organizationNode} typographyProps={{ fontWeight: 500 }} />}
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
            <IconButton onClick={handleCommentCampaign}>
              <Image src='/images/dashboard/post-card/comment.svg' alt='comment' width={23} height={20} />
            </IconButton>
            <Typography>{numberComments} bình luận</Typography>
          </Grid>

          <Grid item xs='auto' container alignItems='center'>
            <IconButton onClick={handleShareCampaign}>
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

        <Button fullWidth variant='contained' sx={{ height: 40 }} disabled={Boolean(joinedStatus)} onClick={handleJoinCampaign}>
          <Typography variant='body2' color='inherit'>
            {(() => {
              switch (joinedStatus) {
                case null: return 'Tham gia ngay'
                case 'APPROVE': return 'Đã tham gia'
                case 'NOT_APPROVE_YET': return 'Đang chờ duyệt'
                case 'REJECT': return 'Bị từ chối'
                default: return 'Tham gia ngay'
              }
            })()}
          </Typography>
        </Button>
      </CardActions>
    </Card>
  )
}

export default Campaign