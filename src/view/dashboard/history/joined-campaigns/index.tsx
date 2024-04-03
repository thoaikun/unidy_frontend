import JoinedCard from "@/component/joined-card"
import JoinedCardLoading from "@/component/joined-card/loading"
import api from "@/service/api"
import { CampaignHistoryType } from "@/type/campaign"
import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const JoinedCampaigns = () => {
  const [isLoadingJoinedCampaign, setIsLoadingJoinedCampaign] = useState<boolean>(true)
  const [joinedCampaign, setJoinedCampaign] = useState<CampaignHistoryType[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/users/campaigns', {
          params: {
            pageNumber: 0,
            pageSize: 6,
          }
        })

        setJoinedCampaign(response.data)
        setIsLoadingJoinedCampaign(false)
      }
      catch (error: any) {
        toast.error(error.data.error)
      }
    })()
  }, [])

  return (
    <Grid container spacing={2.75}>
      <Grid item xs={12}>
        <Typography variant='h5'>Lịch sử tham gia hoạt động</Typography>
      </Grid>

      <Grid item xs={12} container spacing={3.75}>
        {(() => {
          if (isLoadingJoinedCampaign) {
            return (
              <Grid item xs={6}>
                <JoinedCardLoading />
              </Grid>
            )
          }
          else if (joinedCampaign.length !== 0) {
            return (
              joinedCampaign.map((item) => (
                <Grid item xs={6} key={item.campaignId}>
                  <JoinedCard data={item} />
                </Grid>
              ))
            )
          }
          else {
            return (
              <Grid item xs={12}>
                <Typography>Không có lịch sử tham gia hoạt động.</Typography>
              </Grid>
            )
          }
        })()}
      </Grid>
    </Grid>
  )
}

export default JoinedCampaigns