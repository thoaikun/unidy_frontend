import Notification from "@/component/notification"
import NotificationLoading from "@/component/notification/loading"
import { fetchNotifications, fetchUnseenCount, markReadAll } from "@/lib/features/notifications/notificationsSlide"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { Notifications } from "@mui/icons-material"
import { Badge, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Popover, Typography } from "@mui/material"
import Image from "next/image"
import { MouseEvent, useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

const ListNotifications = () => {
  const { unseenCount, notifications, status } = useAppSelector((state) => state.notifications)
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  useEffect(() => {
    dispatch(fetchUnseenCount())
  }, [dispatch])

  useEffect(() => {
    if (open && status === 'idle') {
      dispatch(fetchNotifications())
    }
  }, [open, status, dispatch])

  const handleMarkReadAll = useCallback(async () => {
    try {
      const response = await api.patch('/users/notifications/unseen')
      dispatch(markReadAll())
      toast.success(response.data.success)
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [dispatch])

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge color='error' overlap='circular' badgeContent={unseenCount}>
          <Notifications sx={{ width: 24, height: 24, transform: 'rotate(20deg)' }} color={open ? 'primary' : 'secondary'} />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{ paper: { sx: { backgroundColor: 'transparent', boxShadow: 'none' } } }}
      >
        <Grid container justifyContent='flex-end' pr={1}>
          <Image src='/images/dashboard/app-bar/popover.svg' alt='popover' width={25} height={17} />
        </Grid>

        <Card
          sx={{
            width: 350,
            m: '2px',
            boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.10), -1px 1px 2px 0px rgba(0, 0, 0, 0.10)'
          }}
        >
          <CardHeader
            title={<Typography fontWeight={500}>Thông báo</Typography>}
            action={
              <Button
                startIcon={<Image src='/images/dashboard/app-bar/read.svg' alt='read' width={14} height={7} />}
                onClick={handleMarkReadAll}
              >
                <Typography variant='caption' color='primary'>Đánh dấu đã đọc</Typography>
              </Button>
            }
          />

          <CardContent>
            {(() => {
              if (status !== 'succeeded') {
                return <NotificationLoading />
              }
              else if (notifications.length !== 0) {
                return (
                  <Grid container maxHeight={450} overflow='auto'>
                    {notifications.map((notification) => (
                      <Grid item xs={12} key={notification.notificationId}>
                        <Notification data={notification} />
                        <Divider />
                      </Grid>
                    ))}
                  </Grid>
                )
              }
              else {
                return <Typography>Không có thông báo nào.</Typography>
              }
            })()}
          </CardContent>

          <CardActions>
            <Button>
              <Typography variant='body2' color='primary'>Xem tất cả thông báo</Typography>
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  )
}

export default ListNotifications