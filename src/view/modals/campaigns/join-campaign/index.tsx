import { joinCampaign } from "@/lib/features/campaigns/campaignsSlice"
import { closeBackdrop, openBackdrop } from "@/lib/features/modals/backdrop/backdropSlice"
import { closeJoinCampaignModal } from "@/lib/features/modals/join-campaign/joinCampaignModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { CampaignType } from "@/type/campaign"
import { CalendarToday, Campaign, Close, LocalPhone, Person, Place } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Skeleton, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

const JoinCampaignModal = () => {
  const user = useAppSelector((state) => state.auth.user)
  const { campaignId } = useAppSelector((state) => state.joinCampaignModal)
  const dispatch = useAppDispatch()

  const [data, setData] = useState<CampaignType>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      if (campaignId) {
        try {
          const response = await api.get(`/campaign/${campaignId}`)

          setData(response.data)
          setIsLoading(false)
        }
        catch (error: any) {
          toast.error(error?.data?.error)
        }
      }
    })()
  }, [campaignId])

  const handleClose = useCallback(() => {
    dispatch(closeJoinCampaignModal())
  }, [dispatch])

  const handleJoinCampaign = useCallback(async () => {
    try {
      dispatch(openBackdrop())
      await api.patch(`/campaign/register?campaignId=${campaignId}`)
      dispatch(joinCampaign(campaignId))
      handleClose()
      toast.success('Gửi yêu cầu tham gia thành công')
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
    dispatch(closeBackdrop())
  }, [campaignId, dispatch, handleClose])

  return (
    <Dialog open={true} fullWidth>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogActions>

      <DialogTitle>
        <Typography variant="h4" fontWeight={500}>Xác nhận tham gia chiến dịch</Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h6'>Thông tin cá nhân</Typography>
          </Grid>

          <Grid item xs={12} container spacing={1}>
            <Grid item xs='auto'>
              <Person color='primary' fontSize='small' />
            </Grid>

            <Grid item xs>
              <Typography>Họ và tên: &nbsp; {user?.fullName}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={1}>
            <Grid item xs='auto'>
              <LocalPhone color='primary' fontSize='small' />
            </Grid>

            <Grid item xs>
              <Typography>Số điện thoại: &nbsp; {user?.phone}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h6'>Thông tin chiến dịch</Typography>
          </Grid>

          <Grid item xs={12} container spacing={1}>
            <Grid item xs='auto'>
              <Campaign color='primary' fontSize='small' />
            </Grid>

            <Grid item xs>
              {isLoading ? (
                <Skeleton width='50%' animation='wave' />
              ) : (
                <Typography>Tên chiến dịch: &nbsp; {data?.campaign.title}</Typography>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={1}>
            <Grid item xs='auto'>
              <CalendarToday color='primary' fontSize='small' />
            </Grid>

            <Grid item xs>
              {isLoading ? (
                <Skeleton width='50%' animation='wave' />
              ) : (
                <Typography>
                  Thời gian diễn ra: &nbsp; {data?.campaign.timeTakePlace ?
                    new Date(data?.campaign.timeTakePlace).toLocaleString() :
                    'Không có thông tin'}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={1}>
            <Grid item xs='auto'>
              <Place color='primary' fontSize='small' />
            </Grid>

            <Grid item xs>
              {isLoading ? (
                <Skeleton width='50%' animation='wave' />
              ) : (
                <Typography>Nơi diễn ra: &nbsp; {data?.campaign.location}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button fullWidth variant='contained' disabled={isLoading} onClick={handleJoinCampaign}>
          Xác nhận tham gia
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default JoinCampaignModal