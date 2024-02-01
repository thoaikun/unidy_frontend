'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTheme, Grid, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, styled, Box } from '@mui/material'
import Introduction from '@/component/introduction'
import AccountType from '@/view/authentication/sign-up/account-type'
import CustomStepper from '@/view/authentication/sign-up/stepper'
import RegisterAccount from '@/view/authentication/sign-up/register-account'
import PersonalInformation from '@/view/authentication/sign-up/personal-information'
import Finish from '@/view/authentication/sign-up/finish'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 9,
    left: -41,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.text.primary,
    borderTopWidth: 3,
    borderRadius: 1,
    width: 50,
  },
}));

const SignUpPage = () => {
  const theme = useTheme()
  const [step, setStep] = useState<number>(1)

  return (
    <Grid container height={1}>
      <Grid item width={500} display={{ xs: 'none', lg: 'block' }} sx={{ backgroundColor: '#ffffff' }}>
        {step === 1 ? <Introduction /> : <CustomStepper step={step} />}
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
        <Box display={{ xs: 'none', lg: 'block' }}><Image src='images/logo-big.svg' alt='logo' width={200} height={60} /></Box>
        <Box display={{ xs: 'block', lg: 'none' }}><Image src='images/logo-small.svg' alt='logo' width={73} height={76} /></Box>
        {step > 1 &&
          <Stepper
            alternativeLabel
            activeStep={Math.floor(step) - 1}
            connector={<QontoConnector theme={theme} />}
            sx={{ mt: 4, display: { xs: 'flex', lg: 'none' } }}
          >
            {Array.from(Array(3).keys()).map((item, index) => (
              <Step completed={item < Math.floor(step)} sx={{ mx: 2 }} key={index}>
                <StepLabel
                  icon={
                    <Image
                      src={`icons/dot-${item > Math.floor(step) - 1 ? 'todo' : item < Math.floor(step) - 1 ? 'done' : 'doing'}.svg`}
                      alt='dot'
                      width={20}
                      height={20}
                    />
                  }
                />
              </Step>
            ))}
          </Stepper>
        }
        <Box sx={{ mt: { xs: step > 1 ? 6 : 10, lg: 10 } }}>
          {step === 1 && <AccountType setStep={setStep} />}
          {Math.floor(step) === 2 && <RegisterAccount setStep={setStep} />}
          {step === 3 && <PersonalInformation setStep={setStep} />}
          {step === 4 && <Finish />}
        </Box>
      </Grid>
    </Grid>
  )
}

export default SignUpPage