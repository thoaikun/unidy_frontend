'use client'

import { ReactNode, useEffect } from 'react'
import { Grid } from '@mui/material'
import CustomAppBar from '@/component/app-bar'
import SideBar from '@/component/side-bar'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { useRouter } from 'next/navigation'
import { fetchUser } from '@/lib/features/auth/authSlice'
import { deleteCookie } from 'cookies-next'
import CustomBottomNavigation from '@/component/bottom-navigation'

interface Props {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  const { status } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (status === 'failed') {
      deleteCookie('access_token')
      deleteCookie('refresh_token')
      router.replace('/log-in')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser())
    }
  }, [status, dispatch])

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