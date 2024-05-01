'use client'

import CustomTable from "@/component/table"
import { spentAmount } from "@/fakeData/campaigns"
import { Card, Tab, Tabs, useTheme } from "@mui/material"
import { useState } from "react"
import JoinRequests from "./join-requests"
import ApprovedVolunteers from "./approved-volunteers"
import ListDonators from "./list-donators"

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

const CampaignDetailOrganization = ({ campaignId }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  return (
    <Card sx={{ px: 5, py: 3, height: 1 }}>
      <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)}>
        {['Yêu cầu tham gia', 'Người tham gia', 'Người ủng hộ', 'Các khoảng chi'].map((item, index) => (
          <Tab key={index} label={item} sx={{ textTransform: 'none' }} />
        ))}
      </Tabs>

      {(() => {
        switch (tabIndex) {
          case 0: return <JoinRequests campaignId={campaignId} />
          case 1: return <ApprovedVolunteers campaignId={campaignId} />
          case 2: return <ListDonators campaignId={campaignId} />
          case 3: return <CustomTable header={headerSpentAmount} data={spentAmount} sx={{ mt: 2 }} />
          default: return <JoinRequests campaignId={campaignId} />
        }
      })()}
    </Card>
  )
}

export default CampaignDetailOrganization