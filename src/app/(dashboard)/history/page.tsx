import JoinedCampaigns from "@/view/dashboard/history/joined-campaigns"
import TransactionHistory from "@/view/dashboard/history/transaction-history"
import HistoryOrganization from "@/view/dashboard/history/organization"
import { Grid } from "@mui/material"
import { cookies } from "next/headers"

const HistoryPage = () => {
  const cookieStore = cookies()
  const isVolunteer = cookieStore.get('role')?.value !== 'ORGANIZATION'

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