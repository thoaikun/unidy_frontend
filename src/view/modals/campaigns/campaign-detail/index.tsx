import { closeCampaignDetail } from "@/lib/features/modals/campaign-detail-modal/campaignDetailModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { CampaignType } from "@/type/campaign"
import { Close } from "@mui/icons-material"
import { Dialog, Grid, IconButton, Skeleton } from "@mui/material"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import CampaignInteraction from "./campaign-interaction"

const CampaignDetail = () => {
  const [data, setData] = useState<CampaignType>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { open, campaignId } = useAppSelector((state) => state.campaignDetailModal)
  const dispatch = useAppDispatch()

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
    dispatch(closeCampaignDetail())
  }, [dispatch])

  return (
    <Dialog open={open} maxWidth='lg' fullWidth>
      <IconButton sx={{ position: 'absolute', top: 20, right: 20, zIndex: 1 }} onClick={handleClose}>
        <Close sx={{ color: '#000000' }} />
      </IconButton>
      {(() => {
        if (isLoading) {
          return (
            <Grid container spacing={2}>
              <Grid item xs='auto'>
                <Skeleton variant='rounded' width={700} height={700} animation='wave' />
              </Grid>
              <Grid item xs>
                <Skeleton variant='rounded' width='100%' height={700} animation='wave' />
              </Grid>
            </Grid>
          )
        }
        else if (data) {
          return (
            <Grid container spacing={2} overflow='hidden'>
              <Grid item xs='auto' height={716}>
                <Image
                  src={data.campaign.linkImage ? JSON.parse(data.campaign.linkImage)[0] : '/examples/campaign-media.svg'}
                  alt='post-detail-image'
                  width={700}
                  height={700}
                  style={{ objectFit: 'cover' }}
                />
              </Grid>

              <Grid item xs height={716}>
                <CampaignInteraction data={data} setData={setData} />
              </Grid>
            </Grid>
          )
        }
        else {
          return <></>
        }
      })()}
    </Dialog >
  )
}

export default CampaignDetail