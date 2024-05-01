import { ReactNode } from 'react'
import { Grid } from '@mui/material'
import CustomAppBar from '@/view/dashboard/app-bar'
import SideBar from '@/view/dashboard/side-bar'
import CustomBottomNavigation from '@/view/dashboard/bottom-navigation'
import { cookies } from 'next/headers'

interface Props {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  const cookieStore = cookies()
  const role = cookieStore.get('role')?.value
  const isVolunteer = role !== 'ORGANIZATION'

  return (
    <Grid container>
      <CustomAppBar isVolunteer={isVolunteer} />

      <Grid item width={70} display={{ xs: 'none', md: 'block' }}>
        <SideBar isVolunteer={isVolunteer} />
      </Grid>

      <Grid item xs={12} md px={{ xs: 4, md: 8 }} pt={4} pb={{ xs: 12, md: 4 }}>
        {children}
      </Grid>

      <CustomBottomNavigation />
    </Grid >
  )
}

export default DashboardLayout