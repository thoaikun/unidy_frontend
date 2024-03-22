import { Box, Grid, Step, StepConnector, StepLabel, Stepper, stepConnectorClasses, styled, useTheme } from "@mui/material"
import { useCallback, useState } from "react"
import CustomStepper from "./stepper"
import { UserRoleType } from "@/type/user"
import Image from "next/image"
import SignUpVolunteer from "./volunteer"
import SignUpOrganization from "./organization"

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

interface IProps {
  role: UserRoleType
  handleBackToSelectRole: () => void
}

const SignUpView = ({ role, handleBackToSelectRole }: IProps) => {
  const theme = useTheme()
  const [step, setStep] = useState<number>(2)
  const isVolunteer = role !== "ORGANIZATION"

  const handleNext = useCallback(() => {
    setStep(step + 1)
  }, [step])

  const handleBack = useCallback(() => {
    if (step !== 2) {
      setStep(step - 1)
    }
    else {
      handleBackToSelectRole()
    }
  }, [step, handleBackToSelectRole])

  return (
    <Grid container height={1}>
      <Grid item width={500} display={{ xs: 'none', lg: 'block' }} sx={{ backgroundColor: '#ffffff' }}>
        <CustomStepper isVolunteer={isVolunteer} step={step} />
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
            {Array.from(Array(isVolunteer ? 3 : 4).keys()).map((item, index) => (
              <Step completed={item < Math.floor(step)} sx={{ mx: 2 }} key={index}>
                <StepLabel
                  icon={
                    <Image
                      src={`/images/authentication/sign-up/mobile/dot-${item > Math.floor(step) - 1 ? 'todo' : item < Math.floor(step) - 1 ? 'done' : 'doing'}.svg`}
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
        <Box mt={{ xs: 6, lg: 10 }}>
          {isVolunteer ? (
            <SignUpVolunteer role={role} step={step} handleNext={handleNext} handleBack={handleBack} />
          ) : (
            <SignUpOrganization step={step} handleNext={handleNext} handleBack={handleBack} />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default SignUpView