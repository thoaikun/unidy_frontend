import { theme } from "@/component/theme"
import { joinCampaign, reactCampaign } from "@/lib/features/campaigns/campaignsSlice"
import { closeCampaignDetail } from "@/lib/features/modals/campaign-detail-modal/campaignDetailModalSlice"
import { openDonateModal } from "@/lib/features/modals/donate-modal/donateModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { CampaignDetailType } from "@/type/campaign"
import { calculateDifferenceTime } from "@/utils/diff-time"
import { Close } from "@mui/icons-material"
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Skeleton, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

const CampaignDetail = () => {
  const [campaignData, setCampaignData] = useState<CampaignDetailType>()
  const { open, campaignId } = useAppSelector((state) => state.campaignDetailModal)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      if (campaignId) {
        try {
          const response = await api.get(`/campaign/${campaignId}`)
          setCampaignData(response.data)
        }
        catch (error: any) {
          toast.error(error.data.error)
        }
      }
    })()
  }, [campaignId])

  const isLiked = campaignData?.userLikes?.find((item) => item.userId === user?.userId)
  const handleaClickLove = useCallback(async () => {
    try {
      await api.patch(`/campaigns/${isLiked ? 'unlike' : 'like'}?campaignId=${campaignId}`)
      dispatch(reactCampaign({ campaignId, isLiked: !isLiked }))
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [dispatch, campaignId, isLiked])

  const handleClose = useCallback(() => {
    dispatch(closeCampaignDetail())
  }, [dispatch])

  const handleOpenDonateModal = useCallback(() => {
    dispatch(openDonateModal({
      campaignId,
      organizationUserId: campaignData?.userNode?.userId || 0,
    }))
  }, [dispatch, campaignId, campaignData?.userNode?.userId])

  const handleJoinCampaign = useCallback(async () => {
    try {
      await api.patch(`/campaign/register?campaignId=${campaignId}`)
      dispatch(joinCampaign(campaignId))
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [campaignId, dispatch])

  return (
    <Dialog open={open} maxWidth='lg' fullWidth>
      {campaignData ? (
        <Grid container spacing={2} overflow='hidden'>
          <Grid item xs='auto' height={716}>
            <Image
              src={campaignData.linkImage ? JSON.parse(campaignData.linkImage)[0] : '/examples/campaign-media.svg'}
              alt='campaign-detail-image'
              width={700}
              height={700}
              style={{ objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs>
            <DialogTitle mt={2}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs='auto'>
                  <Link href={`/volunteers/${campaignData.userNode?.userId}`}>
                    <Avatar src={campaignData.userNode?.profileImageLink || ''} />
                  </Link>
                </Grid>

                <Grid item xs container>
                  <Grid item xs={12}>
                    <Link href={`/volunteers/${campaignData.userNode?.userId}`}>
                      <Typography fontWeight={500}>{campaignData.userNode?.fullName}</Typography>
                    </Link>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography color={theme.palette.text.secondary}>{campaignData.title}</Typography>
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
                  <Typography whiteSpace='pre-line'>{campaignData.content}</Typography>
                </Grid>

                {/* <Grid item xs={12} container columnGap={1}>
                  {campaignData.hashtag?.map((item, index) => (
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
                    <Image src={`/images/dashboard/post-card/${isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
                  </IconButton>
                  <Typography>{campaignData.userLikes.length || 0} lượt thích</Typography>
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

                <Grid item xs={12} container spacing={1}>
                  <Grid item xs={6}>
                    <Button fullWidth variant='outlined' sx={{ height: 40 }} onClick={handleOpenDonateModal}>
                      <Typography variant='body2' color={theme.palette.text.primary}>Ủng hộ</Typography>
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button fullWidth variant='contained' sx={{ height: 40 }} disabled={true} onClick={handleJoinCampaign}>
                      <Typography variant='body2' color='inherit'>Tính năng tham gia</Typography>
                    </Button>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ borderColor: '#000000' }} />
                </Grid>
              </Grid>
            </DialogActions>

            <DialogContent>
              {/* <Grid container spacing={2} mt={2}>
                {campaignData.comments?.map((item, index) => (
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
        </Grid >
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

export default CampaignDetail