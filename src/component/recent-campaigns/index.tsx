import { Grid, Typography } from "@mui/material"
import { OrganizationCampaignType } from "@/type/campaign"
import useApi from "@/hooks/use-api"
import JoinedCardOrganization from "../joined-card-organization"

const RecentCampaigns = () => {
  const { data, isLoading } = useApi<OrganizationCampaignType>('/organization/campaigns', {
    params: {
      pageNumber: 0,
      pageSize: 4,
    }
  })

  return (
    <>
      <Typography variant='h4' my={3}>Các chiến dịch gần dây</Typography>
      <Grid container spacing={2.5}>
        {data.map((campaign) => (
          <Grid item xs={12} key={campaign.campaignId}>
            <JoinedCardOrganization data={campaign} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default RecentCampaigns