'use client'

import CustomTable from "@/component/table"
import { spentAmount } from "@/fakeData/campaigns"
import CertificatePreview from "@/view/dashboard/campaigns/campaign-detail-volunteer/certificate-preview"
import { Box, Card, Grid, Tab, Tabs, Typography } from "@mui/material"
import Image from "next/image"
import { useState } from "react"
import ListSponsors from "./list-sponsors"

const headerSpentAmount = [
  {
    key: 'category',
    label: 'Hạng mục',
  },
  {
    key: 'quantity',
    label: 'Số lượng',
  },
  {
    key: 'cost',
    label: 'Thành tiền',
  },
  {
    key: 'status',
    label: 'Trạng thái',
  },
]
interface Props {
  campaignId: string
}

const CampaignDetailVolunteer = ({ campaignId }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  return (
    <Card sx={{ px: 5, py: 3 }}>
      <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} sx={{ mb: 2 }}>
        <Tab label='Chứng nhận' sx={{ textTransform: 'none' }} />
        <Tab label='Báo cáo chiến dịch' sx={{ textTransform: 'none' }} />
      </Tabs>

      {tabIndex === 0 && <CertificatePreview campaignId={campaignId} />}

      {tabIndex === 1 &&
        <Grid container spacing={4}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Typography>Thông số</Typography>
            </Grid>

            <Grid item xs={12}>
              <Box position='relative' height={292}>
                <Image src='/examples/campaign-detail-chart.svg' alt='media' fill />
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Typography>Các khoản đã chi</Typography>
            </Grid>

            <Grid item xs={12}>
              <CustomTable header={headerSpentAmount} data={spentAmount} />
            </Grid>
          </Grid>

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