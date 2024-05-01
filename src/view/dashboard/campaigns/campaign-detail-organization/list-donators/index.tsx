import { theme } from "@/component/theme"
import UserAvatar from "@/component/user-avatar"
import UserName from "@/component/user-name"
import useApi from "@/hooks/use-api"
import { TransactionType } from "@/type/campaign"
import { calculateDifferenceTime } from "@/utils/diff-time"
import { numberToVND } from "@/utils/number-to-vnd"
import { Divider, Grid, Skeleton, Typography } from "@mui/material"

interface Props {
  campaignId: string
}

const ListDonators = ({ campaignId }: Props) => {
  const { data, isLoading } = useApi<TransactionType>(`/organization/campaigns/${campaignId}/transactions`, {
    params: {
      pageNumber: 0,
      pageSize: 5,
    }
  })

  return (
    <Grid container mt={2}>
      {(() => {
        if (isLoading) {
          return (
            <Grid item container p={2} alignItems='center' spacing={2}>
              <Grid item>
                <Skeleton variant='circular' width={64} height={64} animation='wave' />
              </Grid>

              <Grid item xs>
                <Grid container alignItems='center' columnGap={1}>
                  <Grid item xs={5}>
                    <Typography variant='h6'><Skeleton width='100%' animation='wave' /></Typography>
                  </Grid>

                  <Grid item xs='auto'>
                    <Typography variant='body2'><Skeleton width={100} animation='wave' /></Typography>
                  </Grid>
                </Grid>

                <Typography><Skeleton width='30%' animation='wave' /></Typography>
                <Typography><Skeleton width='30%' animation='wave' /></Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          )
        }
        else if (data.length > 0) {
          return (
            data.map(({ transactionId, transactionTime, transactionAmount, user }) => (
              <Grid item container p={2} alignItems='center' spacing={2} key={transactionId}>
                <Grid item>
                  <UserAvatar
                    data={{ ...user, profileImageLink: user.linkImage, role: 'VOLUNTEER' }}
                    avatarProps={{ sx: { width: 64, height: 64 } }}
                  />
                </Grid>

                <Grid item xs>
                  <Grid container alignItems='center' columnGap={1}>
                    <UserName data={{ ...user, fullName: user.fullName, role: 'VOLUNTEER' }} typographyProps={{ variant: 'h6' }} />
                    <Typography variant='body2' fontWeight={300} color={(theme) => theme.palette.text.secondary}>
                      • {calculateDifferenceTime(transactionTime)}
                    </Typography>
                  </Grid>

                  <Typography fontWeight={300}>Nhà hảo tâm vàng</Typography>
                  <Typography fontWeight={300}>Số tiền ủng hộ: <span style={{ color: theme.palette.primary.main }}>{numberToVND(transactionAmount)}</span></Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            ))
          )
        }
        else {
          return <Typography>Chưa có người ủng hộ nào.</Typography>
        }
      })()}
    </Grid>
  )
}

export default ListDonators