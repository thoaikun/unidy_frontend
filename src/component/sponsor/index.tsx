import { TransactionType } from "@/type/campaign"
import { Avatar, Grid, Typography } from "@mui/material"
import { theme } from "../theme"
import { calculateDifferenceTime } from "@/utils/diff-time"

interface Props {
  data: TransactionType
}

const Sponsor = ({ data: { transactionTime, user: { linkImage, fullName } } }: Props) => {
  return (
    <Grid container spacing={1.875} px={2.5} py={1.875} borderBottom={`1px solid ${theme.palette.text.disabled}`}>
      <Grid item xs='auto'>
        <Avatar src={linkImage || ''} sx={{ width: 64, height: 64 }} />
      </Grid>
      <Grid item xs container alignContent='space-between'>
        <Grid item xs={12} container spacing={2} alignItems='center'>
          <Grid item xs='auto'>
            <Typography fontWeight={500}>{fullName}</Typography>
          </Grid>

          <Grid item xs>
            <Typography fontSize='0.75rem' fontWeight={300}>• {calculateDifferenceTime(transactionTime)}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography fontWeight={300}>Nhà hảo tâm vàng</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography fontWeight={300}>
            Số tiền ủng hộ: <span style={{ color: theme.palette.primary.main }}> 10 triệu đồng</span>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Sponsor