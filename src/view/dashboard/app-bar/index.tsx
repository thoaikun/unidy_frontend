'use client'

import Image from 'next/image'
import { MouseEvent, useCallback, useState } from 'react'
import {
  Grid,
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Divider,
  InputBase,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Skeleton,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { deleteCookie, getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import api from '@/service/api'
import { resetUser } from '@/lib/features/auth/authSlice'
import { resetFriends } from '@/lib/features/friends/friendsSlice'
import { resetPosts } from '@/lib/features/posts/postsSlice'
import { resetCampaigns } from '@/lib/features/campaigns/campaignsSlice'
import ListNotifications from './list-notifications'
import { openNewPost } from '@/lib/features/modals/new-post-modal/newPostModalSlice'

const CustomAppBar = () => {
  const { user, status } = useAppSelector((state) => state.auth)
  const role = getCookie('role')
  const isOrganization = role === 'ORGANIZATION'
  const isLoading = status !== 'succeeded'
  const router = useRouter()
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const handleOpenNewPost = useCallback(() => {
    dispatch(openNewPost())
  }, [dispatch])

  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null)
  const openMore = Boolean(moreAnchorEl)

  const handleClickMore = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setMoreAnchorEl(event.currentTarget)
  }, [])

  const handleCloseMore = useCallback(() => {
    setMoreAnchorEl(null)
  }, [])

  const handleOpenProfile = useCallback(() => {
    router.push('/profile')
  }, [router])

  const handleLogOut = useCallback(async () => {
    try {
      await api.get('/auth/logout')

      deleteCookie('access_token')
      deleteCookie('refresh_token')
      deleteCookie('role')
      deleteCookie('user_data')
      localStorage.clear()

      dispatch(resetUser())
      dispatch(resetFriends())
      dispatch(resetPosts())
      dispatch(resetCampaigns())

      router.push('/log-in')
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [dispatch, router])

  return (
    <>
      <AppBar color='inherit' position='sticky' sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ height: 60 }}>
          <Grid container spacing={1} px={4} height={1} alignItems='center'>
            <Grid item xs md='auto' width={150}>
              <Link href='/home'>
                <Image src='/images/logo-big.svg' alt='logo' width={80} height={25} priority />
              </Link>
            </Grid>

            <Grid item xs display={{ xs: 'none', md: 'block' }}>
              <InputBase
                fullWidth
                startAdornment={<Image src='/images/dashboard/app-bar/search.svg' alt='search' width={13} height={13} style={{ marginRight: 10 }} />}
                placeholder='Type to search' />
            </Grid>

            <Grid item xs='auto' display={{ xs: 'none', md: 'block' }}>
              {isOrganization ? (
                <Button variant='contained' sx={{ px: 2, py: 1 }} disableElevation onClick={handleOpenNewPost}>
                  <Typography color={theme.palette.text.contrast} fontWeight={500}>Tạo hoạt động</Typography>
                </Button>
              ) : (
                <Button variant='contained' sx={{ px: 2, py: 1 }} disableElevation onClick={handleOpenNewPost}>
                  <Typography color={theme.palette.text.contrast} fontWeight={500}>Tạo kỉ niệm mới</Typography>
                </Button>
              )}
            </Grid>

            <Grid item xs='auto' height={1} display={{ xs: 'none', md: 'block' }}>
              <Divider orientation='vertical' flexItem sx={{ height: 1, borderWidth: 1, mx: 1 }} />
            </Grid>

            <Grid item xs='auto' display={{ xs: 'block', md: 'none' }}>
              <IconButton>
                <Image src='/images/dashboard/app-bar/search-selected.svg' alt='search' width={20} height={20} />
              </IconButton>
            </Grid>

            <Grid item xs='auto'>
              <ListNotifications />
            </Grid>

            <Grid item xs='auto' display={{ xs: 'block', md: 'none' }}>
              <IconButton>
                <Image src='/images/dashboard/side-bar/message.svg' alt='message' width={20} height={20} />
              </IconButton>
            </Grid>

            <Grid item xs='auto' display={{ xs: 'block', md: 'none' }}>
              <IconButton>
                <Image src='/images/dashboard/app-bar/more-three-dot.svg' alt='more-three-dot' width={20} height={20} />
              </IconButton>
            </Grid>

            <Grid item xs='auto' display={{ xs: 'none', md: 'block' }}>
              <IconButton>
                <Image src='/images/dashboard/app-bar/setting.svg' alt='setting' width={20} height={20} />
              </IconButton>
            </Grid>

            <Grid item xs='auto' container display={{ xs: 'none', md: 'flex' }}>
              <IconButton onClick={handleOpenProfile} disabled={isLoading}>
                {isLoading ? (
                  <Skeleton variant='circular' width={30} height={30} animation='wave' />
                ) : (
                  <Avatar src={user?.image} sx={{ width: 30, height: 30 }} />
                )}
              </IconButton>

              <IconButton onClick={handleClickMore}>
                <Image src='/images/dashboard/app-bar/more-vertical.svg' alt='more-vertical' width={15} height={15} />
              </IconButton>
              <Menu
                anchorEl={moreAnchorEl}
                open={openMore}
                onClose={handleCloseMore}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{ mt: 4 }}
                MenuListProps={{ sx: { width: 190 } }}
              >
                <MenuItem onClick={handleLogOut}>
                  <Typography color={theme.palette.error[300]}>Đăng xuất</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar >

      {/* <Dialog open={openModal} PaperProps={{ sx: { maxWidth: 1072, height: 591 } }} fullWidth>
        <DialogContent>
          <Grid container>
            <Grid item width={565}>
              <Typography variant='h5' fontWeight={400} my={2}>Tải hình ảnh</Typography>
              <Image src='/examples/upload-file.svg' alt='upload-file' width={233} height={200} />
            </Grid>
            <Grid item width={459}>
              <CardHeader
                avatar={<Avatar src='/examples/avatar.jpg' />}
                title={
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography fontWeight={500}>Thoại Lê Nè</Typography>
                    </Grid>

                    <Grid item xs container alignItems='center'>
                      <Typography variant='body2' fontWeight={300}>• 10m</Typography>
                    </Grid>
                  </Grid>
                }
                action={
                  <IconButton onClick={() => setOpenModal(false)}>
                    <Image src='/images/dashboard/modal/close.svg' alt='close' width={16} height={16} />
                  </IconButton>
                }
              />
              <TextField
                fullWidth
                variant='standard'
                multiline
                rows={5}
                placeholder='Nêu cảm nghĩ của bạn'
                sx={{ mt: 0.5 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog> */}
    </>
  )
}

export default CustomAppBar