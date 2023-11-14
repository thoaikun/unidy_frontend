'use client'

import { useState } from 'react'
import InformationForm from '@/view/authentication/forgot-password/information'
import NewPasswordForm from '@/view/authentication/forgot-password/new-password'

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<number>(0)

  return (step === 0 ? <InformationForm setStep={setStep} /> : <NewPasswordForm />)
}

export default ForgotPasswordPage