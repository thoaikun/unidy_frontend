import UserAvatar from "@/component/user-avatar"
import UserName from "@/component/user-name"
import useApi from "@/hooks/use-api"
import { closeBackdrop, openBackdrop } from "@/lib/features/modals/backdrop/backdropSlice"
import { useAppDispatch } from "@/lib/hook"
import api from "@/service/api"
import { JoinRequestType } from "@/type/campaign"
import { calculateDifferenceTime } from "@/utils/diff-time"
import { Button, Checkbox, Divider, Grid, Skeleton, Typography } from "@mui/material"
import { ChangeEvent, useCallback, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  campaignId: string
}

const JoinRequests = ({ campaignId }: Props) => {
  const { data, isLoading, getData } = useApi<JoinRequestType>(`/organization/campaigns/${campaignId}/not-approved-volunteers`, {
    params: {
      pageNumber: 0,
      pageSize: 5,
    }
  })
  const dispatch = useAppDispatch()

  const [volunteerIds, setVolunteerIds] = useState<number[]>([])

  const handleSelect = useCallback((userId: number) => (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setVolunteerIds((state) => [...state, userId])
    }
    else {
      setVolunteerIds((state) => state.filter((volunteerId) => volunteerId !== userId))
    }
  }, [])

  const approveVolunteers = useCallback(async () => {
    try {
      dispatch(openBackdrop())
      await api.patch(`/organization/campaigns/${campaignId}/approve-volunteer`, { volunteerIds })
      setVolunteerIds([])
      await getData()
      toast.success('Phê duyệt yêu cầu thành công')
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
    dispatch(closeBackdrop())
  }, [campaignId, dispatch, getData, volunteerIds])

  const rejectVolunteers = useCallback(async () => {
    try {
      dispatch(openBackdrop())
      await api.patch(`/organization/campaigns/${campaignId}/reject-volunteer`, { volunteerIds })
      setVolunteerIds([])
      await getData()
      toast.success('Xóa yêu cầu thành công')
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
    dispatch(closeBackdrop())
  }, [campaignId, dispatch, getData, volunteerIds])

  return (
    <Grid container mt={2}>
      <Grid item container justifyContent='flex-end'>
        <Button
          variant='outlined'
          sx={{ mr: 2 }}
          color='inherit'
          disabled={volunteerIds.length === 0}
          onClick={rejectVolunteers}
        >
          Xóa
        </Button>
        <Button
          variant='outlined'
          disabled={volunteerIds.length === 0}
          onClick={approveVolunteers}
        >
          Phê duyệt
        </Button>
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
                  <Checkbox onChange={handleSelect(joinRequest.userId)} checked={volunteerIds.includes(joinRequest.userId)} />
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