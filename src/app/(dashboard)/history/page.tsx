'use client'

import { useAppSelector } from "@/lib/hook"
import JoinedCampaigns from "@/view/dashboard/history/joined-campaigns"
import TransactionHistory from "@/view/dashboard/history/transaction-history"
import HistoryOrganization from "@/view/history/history-organization"
import { Grid } from "@mui/material"

const HistoryPage = () => {
  const user = useAppSelector(state => state.auth.user)
  const isVolunteer = user?.role !== 'ORGANIZATION'

  if (isVolunteer) {
    return (
      <Grid container spacing={2.75} width={860}>
        <Grid item xs={12}>
          <TransactionHistory />
        </Grid>

        <Grid item xs={12}>
          <JoinedCampaigns />
        </Grid>
      </Grid>
    )
  }
  else {
    return <HistoryOrganization />
  }
}

export default HistoryPage