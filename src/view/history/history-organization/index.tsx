import CampaignCard from "@/component/campaign-card"
import { Grid, Typography } from "@mui/material"

const HistoryOrganization = () => {
  return (
    <Grid container spacing={4} mt={0}>
      <Grid item>
        <Typography variant='h5'>Danh sách các chiến dịch</Typography>
      </Grid>

      <Grid item xs={12} container spacing={4}>
        {new Array(8).fill('').map((value, index) => (
          <Grid item key={index}>
            <CampaignCard />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default HistoryOrganization