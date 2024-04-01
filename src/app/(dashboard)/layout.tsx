'use client'

import { ReactNode, useEffect } from 'react'
import { Grid } from '@mui/material'
import CustomAppBar from '@/component/app-bar'
import SideBar from '../../component/side-bar'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { useRouter } from 'next/navigation'
import { fetchUser } from '@/lib/features/auth/authSlice'
import { deleteCookie } from 'cookies-next'
import CustomBottomNavigation from '@/component/bottom-navigation'
import { fetchFriends } from '@/lib/features/friends/friendsSlice'

interface Props {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  const { status } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser())
    }
    else if (status === 'succeeded') {
      dispatch(fetchFriends())
    }
    else if (status === 'failed') {
      deleteCookie('access_token')
      deleteCookie('refresh_token')
      deleteCookie('role')
      deleteCookie('user_data')

      router.replace('/log-in')
    }
  }, [status, dispatch, router])

  return (
    <Grid container>
      <CustomAppBar />

      <Grid item width={70} display={{ xs: 'none', md: 'block' }}>
        <SideBar />
      </Grid>

      <Grid item xs={12} md px={{ xs: 4, md: 8 }} pt={4} pb={{ xs: 12, md: 4 }}>
        {children}
      </Grid>

      <CustomBottomNavigation />
    </Grid >
  )
}

export default DashboardLayout