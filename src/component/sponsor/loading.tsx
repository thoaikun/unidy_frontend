import { Grid, Skeleton, Typography } from "@mui/material"
import { theme } from "../theme"

const SponsorLoading = () => {
  return (
    <Grid container spacing={1.875} px={2.5} py={1.875} borderBottom={`1px solid ${theme.palette.text.disabled}`}>
      <Grid item xs='auto'>
        <Skeleton variant='circular' width={64} height={64} animation='wave' />
      </Grid>
      <Grid item xs container alignContent='space-between'>
        <Grid item xs={12}>
          <Typography><Skeleton width={200} animation='wave' /></Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography><Skeleton width={100} animation='wave' /></Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography><Skeleton width={200} animation='wave' /></Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SponsorLoading