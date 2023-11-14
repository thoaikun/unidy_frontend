'use client'

import Image from 'next/image'
import { MouseEvent, useCallback, useState } from 'react'
import {
  Grid,
  Card,
  Badge,
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Popover,
  Divider,
  InputBase,
  Typography,
  IconButton,
  CardHeader,
  CardActions,
  CardContent,
} from '@mui/material'

const notificationData = [
  {
    media: 'https://getinthepicture.org/sites/default/files/images/partner/logos/unicef.png',
    content: 'Đặng Hùng Cường đã chia sẽ một hoạt động mới',
    status: 1,
    createdAt: new Date(),
  },
  {
    media: 'https://getinthepicture.org/sites/default/files/images/partner/logos/unicef.png',
    content: 'Đặng Hùng Cường đã chia sẽ một hoạt động mới',
    status: 0,
    createdAt: new Date(),
  },
  {
    media: 'https://getinthepicture.org/sites/default/files/images/partner/logos/unicef.png',
    content: 'Đặng Hùng Cường đã chia sẽ một hoạt động mới',
    status: 0,
    createdAt: new Date(),
  },
  {
    media: 'https://getinthepicture.org/sites/default/files/images/partner/logos/unicef.png',
    content: 'Đặng Hùng Cường đã chia sẽ một hoạt động mới',
    status: 0,
    createdAt: new Date(),
  },
  {
    media: 'https://getinthepicture.org/sites/default/files/images/partner/logos/unicef.png',
    content: 'Đặng Hùng Cường đã chia sẽ một hoạt động mới',
    status: 0,
    createdAt: new Date(),
  },
  {
    media: 'https://getinthepicture.org/sites/default/files/images/partner/logos/unicef.png',
    content: 'Đặng Hùng Cường đã chia sẽ một hoạt động mới',
    status: 0,
    createdAt: new Date(),
  },
]

const CustomAppBar = () => {
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null)
  const openNotification = Boolean(notificationAnchorEl)

  const handleClickNotification = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setNotificationAnchorEl(event.currentTarget)
  }, [])

  const handleCloseNotification = useCallback(() => {
    setNotificationAnchorEl(null)
  }, [])

  return (
    <AppBar color='inherit' position='sticky'>
      <Toolbar sx={{ height: 84 }}>
        <Grid container spacing={2} px={4} height={1} alignItems='center'>
          <Grid item width={150}>
            <Image src='/images/logo-big.svg' alt='logo' width={100} height={30} />
          </Grid>

          <Grid item xs>
            <InputBase
              fullWidth
              startAdornment={<Image src='/icons/search.svg' alt='icon' width={13} height={13} style={{ marginRight: 10 }} />}
              placeholder='Type to search' />
          </Grid>

          <Grid item xs='auto'>
            <Button variant='contained' sx={{ px: 2, py: 1 }}>
              <Typography variant='h6'>Tạo kỉ niệm mới</Typography>
            </Button>
          </Grid>

          <Grid item xs='auto' height={1}>
            <Divider orientation='vertical' flexItem sx={{ height: 1, borderWidth: 1, mx: 1 }} />
          </Grid>

          <Grid item xs='auto'>
            <IconButton onClick={handleClickNotification}>
              <Badge color='error' overlap='circular' variant='dot'>
                <Image src={`/icons/notification${openNotification ? '-selected' : ''}.svg`} alt='notification' width={30} height={30} />
              </Badge>
            </IconButton>

            <Popover
              open={openNotification}
              anchorEl={notificationAnchorEl}
              onClose={handleCloseNotification}
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
              <Grid container justifyContent='flex-end' my={3} pr={1}>
                <Image src='/icons/popover.svg' alt='popover' width={25} height={17} />
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
                    <Button startIcon={<Image src='/icons/read.svg' alt='read' width={14} height={7} />}>
                      <Typography variant='caption' color='primary'>Đánh dấu đã đọc</Typography>
                    </Button>
                  }
                />

                <CardContent>
                  <Grid container spacing={1} maxHeight={450} overflow='auto'>
                    {notificationData.map(item => (
                      <>
                        <Grid item xs={12}>
                          <Button startIcon={<Avatar src={item.media} />}>
                            <Grid container color='#000000'>
                              <Grid item>
                                <Typography color={item.status ? 'primary' : 'default'} fontWeight={300} textAlign='start'>{item.content}</Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant='caption' fontWeight={300}>{item.createdAt.toLocaleString()}</Typography>
                              </Grid>
                            </Grid>
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </CardContent>

                <CardActions>
                  <Button>
                    <Typography variant='body2' color='primary'>Xem tất cả thông báo</Typography>
                  </Button>
                </CardActions>
              </Card>
            </Popover>
          </Grid>

          <Grid item xs='auto'>
            <IconButton>
              <Image src='/icons/setting.svg' alt='setting' width={30} height={30} />
            </IconButton>
          </Grid>

          <Grid container item xs='auto'>
            <Avatar src='https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/286182314_3223268577951705_5110958408595831979_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FRuC7JY9vXEAX-Es7yY&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBCFwnmNnmq9z-VDLsavSrRLRJ_mG0lLLxi_FmydX96DQ&oe=6557E4BA' />
            <IconButton>
              <Image src='/icons/more-vertical.svg' alt='setting' width={20} height={20} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar >
  )
}

export default CustomAppBar