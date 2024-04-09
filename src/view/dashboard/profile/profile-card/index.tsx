import api from "@/service/api"
import { OrganizationType, UserType, VolunteerType } from "@/type/user"
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useCallback } from "react"
import { toast } from "react-toastify"

interface Props {
  isVolunteer?: boolean
  isOrganization?: boolean
  userData?: UserType | null
  volunteerData?: VolunteerType | null
  setVolunteerData?: Dispatch<SetStateAction<VolunteerType | null>>
  organizationData?: OrganizationType | null
  setOrganizationData?: Dispatch<SetStateAction<OrganizationType | null>>
}

const ProfileCard = ({
  isVolunteer,
  isOrganization,
  userData,
  volunteerData,
  setVolunteerData,
  organizationData,
  setOrganizationData,
}: Props) => {
  const getAvatar = useCallback(() => {
    if (isVolunteer) {
      return volunteerData?.image
    }
    else if (isOrganization) {
      return organizationData?.image
    }
    else {
      return userData?.image
    }
  }, [isVolunteer, volunteerData?.image, isOrganization, organizationData?.image, userData?.image])

  const getName = useCallback(() => {
    if (isVolunteer) {
      return volunteerData?.fullName || 'Không có thông tin'
    }
    else if (isOrganization) {
      return organizationData?.organizationName || 'Không có thông tin'
    }
    else {
      return userData?.fullName || 'Không có thông tin'
    }
  }, [isVolunteer, volunteerData?.fullName, isOrganization, organizationData?.organizationName, userData?.fullName])

  const handleSendMessage = useCallback(() => {
    toast.info('Tính năng đang được phát triền')
  }, [])

  const handleSendInviteFriendRequest = useCallback(async () => {
    try {
      await api.patch(`/users/add-friend?friendId=${volunteerData?.userId}`)
      if (setVolunteerData) {
        setVolunteerData((state) => state ? { ...state, isRequesting: true } : state)
      }
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [volunteerData?.userId, setVolunteerData])

  const handleCancelInviteFriendRequest = useCallback(async () => {
    try {
      await api.delete(`/users/delete-invite?friendId=${volunteerData?.userId}`)
      if (setVolunteerData) {
        setVolunteerData((state) => state ? { ...state, isRequesting: false } : state)
      }
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [volunteerData?.userId, setVolunteerData])

  const handleAcceptInvite = useCallback(async () => {
    try {
      await api.patch(`/users/accept-friend?friendId=${volunteerData?.userId}`)
      if (setVolunteerData) {
        setVolunteerData((state) => state ? { ...state, isFriend: true, isRequested: false } : state)
      }
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [volunteerData?.userId, setVolunteerData])

  const handleDeclineInvite = useCallback(async () => {
    try {
      await api.patch(`/users/decline-invite?friendId=${volunteerData?.userId}`)
      if (setVolunteerData) {
        setVolunteerData((state) => state ? { ...state, isRequested: false } : state)
      }
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [volunteerData?.userId, setVolunteerData])

  const handleUnfriend = useCallback(async () => {
    try {
      await api.patch(`/users/unfriend?friendId=${volunteerData?.userId}`)
      if (setVolunteerData) {
        setVolunteerData((state) => state ? { ...state, isFriend: false } : state)
      }
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [volunteerData?.userId, setVolunteerData])

  const handleFollowOrganization = useCallback(async () => {
    try {
      await api.patch(`/users/follow-organization?organizationId=${organizationData?.userId}`)
      if (setOrganizationData) {
        setOrganizationData((state) => state ? { ...state, isFollow: true } : state)
      }
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [organizationData?.userId, setOrganizationData])

  const handleUnfollowOrganization = useCallback(async () => {
    toast.info('Tính năng đang được phát triền')
  }, [])

  return (
    <Card sx={{ borderRadius: 3, position: 'relative' }}>
      <CardMedia
        component='img'
        sx={{ height: 320 }}
        image='/examples/profile-cover.png'
      />

      <Avatar
        src={getAvatar()}
        sx={{ width: 156, height: 156, position: 'absolute', left: 78, bottom: 22, border: '1px solid #ffffff' }}
      />

      <Box ml={33} mb={2}>
        <CardContent>
          <Typography variant='h3'>{getName()}</Typography>
        </CardContent>

        <CardActions>
          {(() => {
            if (isVolunteer) {
              if (volunteerData?.isFriend) {
                return (
                  <>
                    <Button
                      variant='contained'
                      sx={{ width: 210, height: 30 }}
                      disableElevation
                      onClick={handleSendMessage}
                    >
                      Nhắn tin
                    </Button>
                    <Button
                      variant='outlined'
                      sx={{ width: 148, height: 30 }}
                      onClick={handleUnfriend}
                    >
                      Xóa kết bạn
                    </Button>
                  </>
                )
              }
              else if (volunteerData?.isRequesting) {
                return (
                  <Button
                    variant='outlined'
                    sx={{ width: 148, height: 30 }}
                    disableElevation
                    onClick={handleCancelInviteFriendRequest}
                  >
                    Hủy lời mời
                  </Button>)
              }
              else if (volunteerData?.isRequested) {
                return (
                  <>
                    <Button
                      variant='contained'
                      sx={{ width: 210, height: 30 }}
                      disableElevation
                      onClick={handleAcceptInvite}
                    >
                      Xác nhận
                    </Button>
                    <Button
                      variant='outlined'
                      sx={{ width: 148, height: 30 }}
                      onClick={handleDeclineInvite}
                    >
                      Xóa lời mời
                    </Button>
                  </>
                )
              }
              else {
                return (
                  <Button
                    variant='contained'
                    sx={{ width: 148, height: 30 }}
                    disableElevation
                    onClick={handleSendInviteFriendRequest}
                  >
                    Kết bạn
                  </Button>)
              }
            }
            else if (isOrganization) {
              if (organizationData?.isFollow) {
                return (
                  <Button
                    variant='outlined'
                    sx={{ width: 210, height: 30 }}
                    disableElevation
                    onClick={handleUnfollowOrganization}
                  >
                    Hủy theo dõi
                  </Button>
                )
              }
              else {
                return (
                  <Button
                    variant='contained'
                    sx={{ width: 210, height: 30 }}
                    disableElevation
                    onClick={handleFollowOrganization}
                  >
                    Theo dõi
                  </Button>
                )
              }
            }
          })()}
        </CardActions>
      </Box>
    </Card>
  )
}

export default ProfileCard