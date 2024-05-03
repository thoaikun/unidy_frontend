'use client'

import CertificatePreview from "@/view/dashboard/campaigns/campaign-detail-volunteer/certificate-preview"
import { Card, Grid, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react"
import ListSponsors from "./list-sponsors"
interface Props {
  campaignId: string
}

const CampaignDetailVolunteer = ({ campaignId }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  return (
    <Card sx={{ px: 5, py: 3 }}>
      <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)} sx={{ mb: 2 }}>
        <Tab label='Chứng nhận' sx={{ textTransform: 'none' }} />
        <Tab label='Báo cáo chiến dịch' sx={{ textTransform: 'none' }} />
      </Tabs>

      {tabIndex === 0 && <CertificatePreview campaignId={campaignId} />}

      {tabIndex === 1 &&
        <Grid container spacing={4}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Typography>Các nhà hảo tâm đã đóng góp</Typography>
            </Grid>

            <Grid item xs={12}>
              <ListSponsors campaignId={campaignId} />
            </Grid>
          </Grid>
        </Grid>
      }
    </Card>
  )
}

export default CampaignDetailVolunteer