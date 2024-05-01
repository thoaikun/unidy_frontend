import CampaignCard from "@/component/campaign-card"
import CampaignCardLoading from "@/component/campaign-card/loading"
import useApi from "@/hooks/use-api"
import { OrganizationCampaignType } from "@/type/campaign"
import { Grid, Typography } from "@mui/material"

const RecentActivities = () => {
  const { data, isLoading } = useApi<OrganizationCampaignType>('/organization/campaigns', {
    params: {
      pageNumber: 0,
      pageSize: 5,
    }
  })

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <Typography variant='h5'>Hoạt động gần đây</Typography>
      </Grid>

      <Grid item xs={12} container columnGap={4} wrap='nowrap' overflow='auto'>
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
            return <Typography>Không có hoạt động nào gần đây.</Typography>
          }
        })()}
      </Grid>
    </Grid>
  )
}

export default RecentActivities