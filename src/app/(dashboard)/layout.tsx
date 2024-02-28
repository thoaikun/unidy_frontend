'use client'

import { ReactNode, useEffect } from 'react'
import { Grid } from '@mui/material'
import CustomAppBar from '@/component/app-bar'
import SideBar from '@/component/side-bar'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { useRouter } from 'next/navigation'
import { fetchUserData } from '@/lib/features/auth/authSlice'

interface Props {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  const { status } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (status === 'failed') {
      router.replace('/log-in')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserData())
    }
  }, [status, dispatch])

  return (
    <Grid container>
      <CustomAppBar />

      <Grid item width={70} container>
        <SideBar />
      </Grid>

      <Grid item xs px={8}>
        {children}
      </Grid>
    </Grid >
  )
}

export default DashboardLayout