import UserAvatar from "@/component/user-avatar"
import UserName from "@/component/user-name"
import useApi from "@/hooks/use-api"
import { JoinRequestType } from "@/type/campaign"
import { calculateDifferenceTime } from "@/utils/diff-time"
import { Button, Checkbox, Divider, Grid, Skeleton, Typography } from "@mui/material"

interface Props {
  campaignId: string
}

const JoinRequests = ({ campaignId }: Props) => {
  const { data, isLoading } = useApi<JoinRequestType>(`/organization/campaigns/${campaignId}/not-approved-volunteers`, {
    params: {
      pageNumber: 0,
      pageSize: 5,
    }
  })

  return (
    <Grid container mt={2}>
      <Grid item container justifyContent='flex-end'>
        <Button variant='outlined' sx={{ mr: 2 }} color='inherit' disabled={isLoading || data.length === 0}>Xóa</Button>
        <Button variant='outlined' disabled={isLoading || data.length === 0}>Phê duyệt</Button>
      </Grid>

      {(() => {
        if (isLoading) {
          return (
            <Grid item container p={2} alignItems='center' spacing={2}>
              <Grid item>
                <Checkbox disabled />
              </Grid>

              <Grid item>
                <Skeleton variant='circular' width={64} height={64} animation='wave' />
              </Grid>

              <Grid item xs>
                <Grid container justifyContent='space-between' alignItems='center'>
                  <Grid item xs>
                    <Typography variant='h6'><Skeleton width='50%' animation='wave' /></Typography>
                  </Grid>

                  <Grid item xs='auto'>
                    <Typography variant='body2'><Skeleton width={100} animation='wave' /></Typography>
                  </Grid>
                </Grid>

                <Typography><Skeleton width='30%' animation='wave' /></Typography>
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
            data.map((joinRequest) => (
              <Grid item container p={2} alignItems='center' spacing={2} key={joinRequest.userId}>
                <Grid item>
                  <Checkbox />
                </Grid>

                <Grid item>
                  <UserAvatar
                    data={{ ...joinRequest, profileImageLink: joinRequest.linkImage, role: 'VOLUNTEER' }}
                    avatarProps={{ sx: { width: 64, height: 64 } }}
                  />
                </Grid>

                <Grid item xs>
                  <Grid container justifyContent='space-between' alignItems='center'>
                    <UserName data={{ ...joinRequest, fullName: joinRequest.fullName, role: 'VOLUNTEER' }} typographyProps={{ variant: 'h6' }} />
                    <Typography variant='body2' fontWeight={300} color={(theme) => theme.palette.text.secondary}>
                      • {calculateDifferenceTime(joinRequest.timeJoin)}
                    </Typography>
                  </Grid>

                  <Typography fontWeight={300}>Tuổi: {joinRequest.age}</Typography>
                  <Typography fontWeight={300}>Nghề nghiệp: {joinRequest.job}</Typography>
                  <Typography fontWeight={300}>Nơi công tác: {joinRequest.workLocation}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            ))
          )
        }
        else {
          return <Typography>Không có yêu cầu tham gia nào.</Typography>
        }
      })()}
    </Grid>
  )
}

export default JoinRequests