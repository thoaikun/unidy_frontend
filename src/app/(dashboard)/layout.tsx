import { ReactNode } from 'react'
import { Grid } from '@mui/material'
import CustomAppBar from '@/component/app-bar'
import SideBar from '@/component/side-bar'

interface Props {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <Grid container>
      <CustomAppBar />

      <Grid item width={70} container>
        <SideBar />
      </Grid>

      <Grid item xs px={8}>
        {children}
      </Grid>
    </Grid>
  )
}

export default DashboardLayout