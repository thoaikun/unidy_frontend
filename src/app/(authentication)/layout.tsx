'use client'

import Image from 'next/image'
import { ReactNode } from 'react'
import { Grid, useTheme } from '@mui/material'
import Introduction from '@/component/introduction'

interface Props {
  children: ReactNode
}

const AuthenticationLayout = ({ children }: Props) => {
  const theme = useTheme()

  return (
    <Grid container height={1}>
      <Grid item width={500} display={{ xs: 'none', lg: 'block' }}>
        <Introduction />
      </Grid>

      <Grid
        item
        xs
        container
        sx={{ backgroundColor: theme.palette.primary[50] }}
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        p={4}
      >
        <Image src='images/logo-big.svg' alt='logo' width={200} height={60} style={{ marginBottom: 80 }} />
        {children}
      </Grid>
    </Grid>
  )
}

export default AuthenticationLayout