'use client'

import Image from 'next/image';
import { useTheme, Grid } from '@mui/material';
import Introduction from '@/view/authentication/introduction';
import LogInForm from '@/view/authentication/log-in';

const LoginPage = () => {
  const theme = useTheme()

  return (
    <Grid container height={1}>
      <Grid item width={500}>
        <Introduction />
      </Grid>
      <Grid
        container
        item
        xs
        sx={{ backgroundColor: theme.palette.primary[50] }}
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Image src='images/logo-big.svg' alt='logo' width={200} height={60} style={{ marginBottom: 80 }} />
        <LogInForm />
      </Grid>
    </Grid>
  )
}

export default LoginPage