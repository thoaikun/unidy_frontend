'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { useAppDispatch } from '@/lib/hook'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { CampaignType } from '@/type/campaign'
import { openDonateModal } from '@/lib/features/modals/donateModal/donateModalSlice'

interface Props {
  data: CampaignType
}

const Campaign = ({ data }: Props) => {
  const {
    campaign,
    organizationNode,
    likeCount,
    isLiked,
    isJoined
  } = data
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageRatio, setImageRatio] = useState<number>(1)

  const handleaClickLike = useCallback(async () => {
    toast.info('Tính năng đang được phát triển')
  }, [])

  const handleOpenPostDetail = useCallback(() => {
    toast.info('Tính năng đang được phát triển')
  }, [])

  const handleOpenDonateModal = useCallback(() => {
    dispatch(openDonateModal({
      campaignId: campaign.campaignId,
      organizationUserId: organizationNode.userId,
    }))
  }, [dispatch, campaign.campaignId, organizationNode.userId])

  const handleJoinCampaign = useCallback(() => {
    toast.info('Tính năng đang được phát triển')
  }, [])

  return (
    <Card sx={{ borderRadius: 2, py: 1 }}>
      <CardHeader
        avatar={
          <Link href={`/profile/${organizationNode.userId}`}>
            <Avatar src={organizationNode.profileImageLink || ''} />
          </Link>
        }
        title={
          <Grid container spacing={2}>
            <Grid item>
              <Link href={`/profile/${organizationNode.userId}`}>
                <Typography fontWeight={500}>{organizationNode.fullName}</Typography>
              </Link>
            </Grid>

            <Grid item xs container alignItems='center'>
              <Typography variant='body2' fontWeight={300}>• 10m</Typography>
            </Grid>
          </Grid>
        }
        subheader={<Typography color={theme.palette.text.secondary}>{campaign.title}</Typography>}
      />

      <CardContent sx={{ py: 0 }}>
        <Grid container spacing={1} mb={2}>
          <Grid item xs={12}>
            <Typography whiteSpace='pre-line'>{campaign.content}</Typography>
          </Grid>

          <Grid item xs={12} container columnGap={1}>
            {campaign.hashTag?.map((item, index) => (
              <Typography fontWeight={500} color={theme.palette.text.disabled} key={index}>
                #{item}
              </Typography>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} height={(imageRef.current?.width || 300) * imageRatio} maxHeight={600} position='relative'>
          <Image
            ref={imageRef}
            src={campaign.linkImage ? JSON.parse(campaign.linkImage)[0] : '/examples/campaign-media.svg'}
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