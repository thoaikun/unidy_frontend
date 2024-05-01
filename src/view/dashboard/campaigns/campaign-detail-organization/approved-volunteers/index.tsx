import UserAvatar from "@/component/user-avatar"
import UserName from "@/component/user-name"
import useApi from "@/hooks/use-api"
import { JoinRequestType } from "@/type/campaign"
import { calculateDifferenceTime } from "@/utils/diff-time"
import { MoreVert } from "@mui/icons-material"
import { Divider, Grid, IconButton, Skeleton, Typography } from "@mui/material"

interface Props {
  campaignId: string
}

const ApprovedVolunteers = ({ campaignId }: Props) => {
  const { data, isLoading } = useApi<JoinRequestType>(`/organization/campaigns/${campaignId}/approved-volunteers`, {
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
                <Typography><Skeleton width='30%' animation='wave' /></Typography>
              </Grid>

              <Grid item>
                <IconButton disabled>
                  <MoreVert />
                </IconButton>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          )
        }
        else if (data.length > 0) {
          return (
            data.map((aprrovedVolunteer) => (
              <Grid item container p={2} alignItems='center' spacing={2} key={aprrovedVolunteer.userId}>
                <Grid item>
                  <UserAvatar
                    data={{ ...aprrovedVolunteer, profileImageLink: aprrovedVolunteer.linkImage, role: 'VOLUNTEER' }}
                    avatarProps={{ sx: { width: 64, height: 64 } }}
                  />
                </Grid>

                <Grid item xs>
                  <Grid container alignItems='center' columnGap={1}>
                    <UserName data={{ ...aprrovedVolunteer, fullName: aprrovedVolunteer.fullName, role: 'VOLUNTEER' }} typographyProps={{ variant: 'h6' }} />
                    <Typography variant='body2' fontWeight={300} color={(theme) => theme.palette.text.secondary}>
                      • {calculateDifferenceTime(aprrovedVolunteer.timeJoin)}
                    </Typography>
                  </Grid>

                  <Typography fontWeight={300}>Tuổi: {aprrovedVolunteer.age}</Typography>
                  <Typography fontWeight={300}>Nghề nghiệp: {aprrovedVolunteer.job}</Typography>
                  <Typography fontWeight={300}>Nơi công tác: {aprrovedVolunteer.workLocation}</Typography>
                </Grid>

                <Grid item>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            ))
          )
        }
        else {
          return <Typography>Chưa có người tham gia nào.</Typography>
        }
      })()}
    </Grid>
  )
}

export default ApprovedVolunteers