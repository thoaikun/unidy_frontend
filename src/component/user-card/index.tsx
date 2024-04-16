import { UserNodeType } from "@/type/user"
import { Button, Card, CardHeader, Grid, Typography } from "@mui/material"
import UserName from "../user-name"
import UserAvatar from "../user-avatar"
import { StarOutline, StarRate } from "@mui/icons-material"
import { theme } from "../theme"
import { useCallback } from "react"
import api from "@/service/api"
import { toast } from "react-toastify"
import Image from "next/image"

interface Props {
  data: UserNodeType
  setData?: (value: boolean) => void
}

const UserCard = ({ data, setData }: Props) => {
  const { userId, role, isFriend, isFollow } = data

  const handleSendInviteFriendRequest = useCallback(async () => {
    try {
      await api.patch(`/users/add-friend?friendId=${userId}`)
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [userId])

  const handleFollowOrganization = useCallback(async () => {
    try {
      await api.patch(`/users/follow-organization?organizationId=${userId}`)
      if (setData) {
        setData(true)
      }
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [userId, setData])

  const handleUnfollowOrganization = useCallback(async () => {
    try {
      await api.patch(`/users/unfollow-organization?organizationId=${userId}`)
      if (setData) {
        setData(false)
      }
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [userId, setData])

  const getAction = useCallback(() => {
    if (role !== 'ORGANIZATION') {
      if (isFriend) {
        return (
          <Button startIcon={<Image src='/images/dashboard/connections/friend-primary.svg' alt='friend' width={20} height={20} />}>
            <Typography variant='body2' color='primary' fontWeight={300}>
              Bạn bè
            </Typography>
          </Button>
        )
      }
      else {
        <Button
          startIcon={<Image src='/images/dashboard/connections/add-friend-primary.svg' alt='add-friend' width={20} height={20} />}
          onClick={handleSendInviteFriendRequest}
        >
          <Typography variant='body2' color={'text.secondary'} fontWeight={300}>
            Kết bạn
          </Typography>
        </Button>
      }
    }
    else {
      if (isFollow) {
        return (
          <Button
            startIcon={<StarRate />}
            onClick={handleUnfollowOrganization}
          >
            <Typography variant='body2' color='primary' fontWeight={300}>
              Đã theo dõi
            </Typography>
          </Button>
        )
      }
      else {
        return (
          <Button
            startIcon={<StarOutline sx={{ color: theme.palette.text.secondary }} />}
            onClick={handleFollowOrganization}
          >
            <Typography variant='body2' color={'text.secondary'} fontWeight={300}>
              Theo dõi
            </Typography>
          </Button>
        )
      }
    }
  }, [role, isFriend, isFollow, handleSendInviteFriendRequest, handleFollowOrganization, handleUnfollowOrganization])

  return (
    <Card sx={{ p: 0.5 }}>
      <CardHeader
        avatar={<UserAvatar data={data} />}
        title={<UserName data={data} />}
        action={
          <Grid container alignItems='flex-end' height={45}>
            {getAction()}
          </Grid>
        }
      />
    </Card>
  )
}

export default UserCard