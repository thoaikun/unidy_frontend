import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { object, string } from "yup"
import AccountInformation from "../account-information"
import { useCallback } from "react"
import OrganizationInformation from "./organization-information"
import Success from "./success"
import IdentityVerification from "./identity-verification"
import api from "@/service/api"
import { toast } from "react-toastify"

interface IProps {
  step: number
  handleNext: () => void
  handleBack: () => void
}

export interface formData {
  email: string
  password: string
  fullName: string
  dayOfIncorporation: string
  taxCode: string
  address: string
  phone: string
  contactEmail: string
  proof: string
}

const defaultValues: formData = {
  email: '',
  password: '',
  fullName: '',
  dayOfIncorporation: (() => {
    const today = new Date
    let month = '' + (today.getMonth() + 1)
    let day = '' + today.getDate()
    let year = today.getFullYear()

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-')
  })(),
  taxCode: '',
  address: '',
  phone: '',
  contactEmail: '',
  proof: '',
}

const schema = object({
  email: string().email().required(),
  password: string().required(),
  fullName: string().required(),
  dayOfIncorporation: string().required(),
  taxCode: string().required(),
  address: string().required(),
  phone: string().length(10).required(),
  contactEmail: string().email().required(),
  proof: string().required(),
})

const SignUpOrganization = ({ step, handleNext, handleBack }: IProps) => {
  const { control, handleSubmit, clearErrors, formState: { errors } } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const onNext = useCallback(() => {
    if (Object.keys(errors).length === 0) {
      handleNext()
    }
  }, [errors, handleNext])

  const onBack = useCallback(() => {
    clearErrors()
    handleBack()
  }, [clearErrors, handleBack])

  const onSubmit = useCallback(async (data: formData) => {
    try {
      await api.post('/auth/register', { ...data, role: 'ORGANIZATION' })
      handleNext()
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [handleNext])

  switch (step) {
    case 2:
      return <AccountInformation control={control} errors={errors} handleNext={onNext} handleBack={onBack} />
    case 3:
      return <OrganizationInformation control={control} errors={errors} handleNext={onNext} handleBack={onBack} />
    case 4:
      return <IdentityVerification control={control} errors={errors} handleNext={handleSubmit(onSubmit)} handleBack={onBack} />
    default:
      return <Success />
  }
}

export default SignUpOrganization