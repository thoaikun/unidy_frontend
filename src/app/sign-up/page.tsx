'use client'

import Image from 'next/image';
import { useState } from 'react';
import { useTheme, Grid } from '@mui/material';
import Introduction from '@/view/authentication/introduction';
import AccountType from '@/view/authentication/sign-up/account-type';
import CustomStepper from '@/view/authentication/sign-up/stepper';
import RegisterAccount from '@/view/authentication/sign-up/register-account';
import PersonalInformation from '@/view/authentication/sign-up/personal-information';

const SignUpPage = () => {
  const theme = useTheme()
  const [step, setStep] = useState<number>(1)

  return (
    <Grid container height={1}>
      <Grid item width={500}>
        {step === 1 ? <Introduction /> : <CustomStepper step={step} />}
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
        {step === 1 && <AccountType setStep={setStep} />}
        {Math.floor(step) === 2 && <RegisterAccount setStep={setStep} />}
        {step === 3 && <PersonalInformation setStep={setStep} />}
      </Grid>
    </Grid>
  )
}

export default SignUpPage