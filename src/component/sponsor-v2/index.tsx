import { Divider, Grid, Typography } from "@mui/material"
import UserAvatar from "../user-avatar"
import UserName from "../user-name"
import { TransactionType } from "@/type/campaign"
import { numberToVND } from "@/utils/number-to-vnd"

interface Props {
  data: TransactionType
}

const SponsorV2 = ({ data: { user, transactionAmount } }: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs='auto'>
        <UserAvatar data={{ ...user, profileImageLink: user.linkImage, role: 'VOLUNTEER' }} avatarProps={{ sx: { width: 40, height: 40 } }} />
      </Grid>
      <Grid item xs container alignItems='center'>
        <UserName data={{ ...user, role: 'VOLUNTEER' }} />
      </Grid>
      <Grid item xs='auto' container alignItems='center'>
        <Typography>{numberToVND(transactionAmount)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  )
}

export default SponsorV2