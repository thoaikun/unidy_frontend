import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { object, string } from "yup"
import AccountInformation from "../account-information"
import PersonalInformation from "./personal-information"
import { useCallback } from "react"
import Success from "./success"
import api from "@/service/api"
import { toast } from "react-toastify"

interface IProps {
  role: 'VOLUNTEER' | 'SPONSOR'
  step: number
  handleNext: () => void
  handleBack: () => void
}

export interface formData {
  email: string
  password: string
  fullName: string
  dayOfBirth: string
  sex: string
  phone: string
  job: string
  workLocation: string
}

const defaultValues: formData = {
  email: '',
  password: '',
  fullName: '',
  dayOfBirth: (() => {
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
  sex: '',
  phone: '',
  job: '',
  workLocation: '',
}

const schema = object({
  email: string().email().required(),
  password: string().required(),
  fullName: string().required(),
  dayOfBirth: string().required(),
  sex: string().required(),
  phone: string().length(10).required(),
  job: string().required(),
  workLocation: string().required(),
})

const SignUpVolunteer = ({ role, step, handleNext, handleBack }: IProps) => {
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
      await api.post('/auth/register', { ...data, role })
      handleNext()
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [role, handleNext])

  switch (step) {
    case 2:
      return <AccountInformation control={control} errors={errors} handleNext={onNext} handleBack={onBack} />
    case 3:
      return <PersonalInformation control={control} errors={errors} handleNext={handleSubmit(onSubmit)} handleBack={onBack} />
    default:
      return <Success />
  }
}

export default SignUpVolunteer