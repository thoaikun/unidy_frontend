import CampaignDetailOrganization from "@/view/dashboard/campaigns/campaign-detail-organization"
import CampaignDetailVolunteer from "@/view/dashboard/campaigns/campaign-detail-volunteer"
import CampaignInformation from "@/view/dashboard/campaigns/campaign-information"
import { Grid } from "@mui/material"
import { cookies } from "next/headers"

interface Props {
  params: {
    campaignId: string
  }
}

const CampaignDetail = ({ params: { campaignId } }: Props) => {
  const cookieStore = cookies()
  const isVolunteer = cookieStore.get('role')?.value !== 'ORGANIZATION'

  return (
    <Grid container spacing={6.5}>
      <Grid item width={536}>
        <CampaignInformation campaignId={campaignId} isVolunteer={isVolunteer} />
      </Grid>

      <Grid item xs>
        {isVolunteer ? (
          <CampaignDetailVolunteer campaignId={campaignId} />
        ) : (
          <CampaignDetailOrganization campaignId={campaignId} />
        )}
      </Grid>
    </Grid>
  )
}

export default CampaignDetail