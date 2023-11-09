'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Grid, useTheme } from '@mui/material'
import Introduction from '@/view/authentication/introduction'
import InformationForm from '@/view/authentication/forgot-password/information'
import NewPasswordForm from '@/view/authentication/forgot-password/new-password'

const ForgotPasswordPage = () => {
  const theme = useTheme()
  const [step, setStep] = useState<number>(0)

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
        {step === 0 ? <InformationForm setStep={setStep} /> : <NewPasswordForm />}
      </Grid>
    </Grid>
  )
}

export default ForgotPasswordPage