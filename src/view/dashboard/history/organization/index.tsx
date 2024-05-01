'use client'

import CampaignCard from "@/component/campaign-card"
import CampaignCardLoading from "@/component/campaign-card/loading"
import useApi from "@/hooks/use-api"
import { OrganizationCampaignType } from "@/type/campaign"
import { Grid, Typography } from "@mui/material"

const HistoryOrganization = () => {
  const { isLoading, data } = useApi<OrganizationCampaignType>('/organization/campaigns', {
    params: {
      pageNumber: 0,
      pageSize: 10,
    }
  })

  return (
    <Grid container spacing={4} mt={0}>
      <Grid item>
        <Typography variant='h5'>Danh sách các chiến dịch</Typography>
      </Grid>

      <Grid item xs={12} container spacing={4}>
        {(() => {
          if (isLoading) {
            return (
              <Grid item xs='auto'>
                <CampaignCardLoading />
              </Grid>
            )
          }
          else if (data.length > 0) {
            return (
              data.map((campaign) => (
                <Grid item xs='auto' key={campaign.campaignId}>
                  <CampaignCard data={campaign} />
                </Grid>
              ))
            )
          }
          else {
            return <Typography>Không có lịch sử chiến dịch.</Typography>
          }
        })()}
      </Grid>
    </Grid>
  )
}

export default HistoryOrganization