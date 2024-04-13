import { NotificationType } from "@/type/notification"
import { Avatar, Button, Grid, Typography } from "@mui/material"
import { theme } from "../theme"
import { calculateDifferenceTime } from "@/utils/diff-time"
import { useCallback } from "react"
import api from "@/service/api"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hook"
import { markReadById } from "@/lib/features/notifications/notificationsSlide"

interface Props {
  data: NotificationType
}

const Notification = ({
  data: {
    notificationId,
    description,
    createdTime,
    seenTime,
    type,
    extra: { id },
    owner: { linkImage }
  }
}: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleClick = useCallback(async () => {
    try {
      if (!seenTime) {
        await api.patch(`/users/notifications/unseen/${notificationId}`)
        dispatch(markReadById(notificationId))
      }

      switch (type) {
        case 'FRIEND_REQUEST':
        case 'FRIEND_ACCEPT':
          router.push(`/volunteers/${id}`)
          break
        case 'NEW_CAMPAIGN':
        case 'CAMPAIGN_END':
          router.push(`/campaigns/${id}`)
          break
      }
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [dispatch, notificationId, id, router, seenTime, type])

  return (
    <Button
      fullWidth
      startIcon={<Avatar src={linkImage || ''} sx={{ width: 40, height: 40 }} />}
      onClick={handleClick}
    >
      <Grid container ml={1}>
        <Grid item xs={12} container justifyContent='flex-start'>
          <Typography
            color={theme.palette[seenTime ? 'text' : 'primary'].main}
            fontWeight={300}
            textAlign='left'
          >
            {description}
          </Typography>
        </Grid>

        <Grid item xs={12} container justifyContent='flex-start'>
          <Typography variant='caption'>
            {calculateDifferenceTime(createdTime)}
          </Typography>
        </Grid>
      </Grid>
    </Button>
  )
}

export default Notification