'use client'

import CustomTable from "@/component/table"
import { Card, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import JoinRequests from "./join-requests"
import ApprovedVolunteers from "./approved-volunteers"
import ListDonators from "./list-donators"

interface Props {
  campaignId: string
}

const CampaignDetailOrganization = ({ campaignId }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  return (
    <Card sx={{ px: 5, py: 3, height: 1 }}>
      <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)}>
        {['Yêu cầu tham gia', 'Người tham gia', 'Người ủng hộ'].map((item, index) => (
          <Tab key={index} label={item} sx={{ textTransform: 'none' }} />
        ))}
      </Tabs>

      {(() => {
        switch (tabIndex) {
          case 0: return <JoinRequests campaignId={campaignId} />
          case 1: return <ApprovedVolunteers campaignId={campaignId} />
          case 2: return <ListDonators campaignId={campaignId} />
          default: return <JoinRequests campaignId={campaignId} />
        }
      })()}
    </Card>
  )
}

export default CampaignDetailOrganization