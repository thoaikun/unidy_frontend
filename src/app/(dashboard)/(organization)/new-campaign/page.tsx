'use client'

import ImagePreview from "@/component/image-preview"
import UploadImage from "@/component/upload-image"
import { closeBackdrop, openBackdrop } from "@/lib/features/modals/backdrop/backdropSlice"
import { useAppDispatch } from "@/lib/hook"
import api from "@/service/api"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { array, mixed, number, object, string } from "yup"

interface formData {
  title: string
  description: string
  startDate: string
  endDate: string
  donationBudget: number
  numberVolunteer: number
  timeTakePlace: string
  location: string
  listImageFile: File[]
  hashTag?: string
  status: string
  categories: {
    communityType: number,
    education: number,
    research: number,
    helpOther: number,
    environment: number,
    healthy: number,
    emergencyPreparedness: number
  }
}

const defaultValues: formData = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  donationBudget: 0,
  numberVolunteer: 0,
  timeTakePlace: '',
  location: '',
  listImageFile: [],
  hashTag: '',
  status: 'IN_PROGRESS',
  categories: {
    communityType: 0.3,
    education: 0.3,
    research: 0,
    helpOther: 0.1,
    environment: 1,
    healthy: 0.3,
    emergencyPreparedness: 0,
  },
}

const schema = object({
  title: string().required(),
  description: string().required(),
  startDate: string().required(),
  endDate: string().required(),
  donationBudget: number().required(),
  numberVolunteer: number().required(),
  timeTakePlace: string().required(),
  location: string().required(),
  listImageFile: array().of(mixed<File>().required()).required(),
  hashTag: string(),
  status: string().required(),
  categories: object({
    communityType: number().required(),
    education: number().required(),
    research: number().required(),
    helpOther: number().required(),
    environment: number().required(),
    healthy: number().required(),
    emergencyPreparedness: number().required(),
  }),
})

interface Props {
  searchParams: {
    returnUrl: string
  }
}

const NewCampaign = ({ searchParams: { returnUrl } }: Props) => {
  const dispatch = useAppDispatch()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(async (data: formData) => {
    try {
      dispatch(openBackdrop())
      const formData = new FormData()
      for (const [key, value] of Object.entries(data)) {
        if (key !== 'listImageFile') {
          formData.append(key, value)
        }
        else {
          value.forEach((file: File) => {
            formData.append('listImageFile[]', file)
          })
        }
      }

      await api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Chiến dịch đã được tạo thành công')
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
    dispatch(closeBackdrop())
  }, [dispatch])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs>
          <Typography variant='h3'>Tạo chiến dịch mới</Typography>
        </Grid>

        <Grid item xs='auto'>
          <Link href={returnUrl || '/home'}>
            <Button variant='outlined' color='error' sx={{ width: 94, height: 38 }}>
              <Typography variant='body2' fontWeight={500} color='error'>
                Hủy
              </Typography>
            </Button>
          </Link>
        </Grid>

        <Grid item xs='auto'>
          <Button
            variant='contained'
            sx={{ width: 192, height: 38 }}
            onClick={handleSubmit(onSubmit)}
          >
            <Typography variant='body2' fontWeight={500} color='text.contrast'>
              Tạo chiến dịch
            </Typography>
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} container spacing={8}>
        <Grid item xs={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5' fontWeight={400}>Thông tin chung</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>Tên chiến dịch</Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='title'
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  size='small'
                  placeholder='Nhập tên chiến dịch'
                  InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
                  InputLabelProps={{ sx: { fontSize: '1rem' } }}
                  inputProps={{ style: { fontSize: '1rem' } }}
                  error={Boolean(errors.title)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>Mô tả</Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='description'
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  size='small'
                  placeholder='Nhập mô tả'
                  multiline
                  rows={3}
                  InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
                  InputLabelProps={{ sx: { fontSize: '1rem' } }}
                  inputProps={{ style: { fontSize: '1rem' } }}
                  error={Boolean(errors.description)}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6'>Thời gian mở đơn</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name='startDate'
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    fullWidth
                    size='small'
                    placeholder='Nhập thời gian mở đơn'
                    InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
                    InputLabelProps={{ sx: { fontSize: '1rem' } }}
                    inputProps={{ style: { fontSize: '1rem' } }}
                    error={Boolean(errors.startDate)}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={6} container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6'>Thời gian đóng đơn</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name='endDate'
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    fullWidth
                    size='small'
                    placeholder='Nhập thời gian đóng đơn'
                    InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
                    InputLabelProps={{ sx: { fontSize: '1rem' } }}
                    inputProps={{ style: { fontSize: '1rem' } }}
                    error={Boolean(errors.endDate)}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>Mục tiêu</Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='donationBudget'
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  size='small'
                  placeholder='Nhập mục tiêu'
                  InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
                  InputLabelProps={{ sx: { fontSize: '1rem' } }}
                  inputProps={{ style: { fontSize: '1rem' } }}
                  error={Boolean(errors.donationBudget)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>Số lượng tình nguyện viên</Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='numberVolunteer'
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  size='small'
                  placeholder='Nhập số lượng tình nguyện viên'
                  InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
                  InputLabelProps={{ sx: { fontSize: '1rem' } }}
                  inputProps={{ style: { fontSize: '1rem' } }}
                  error={Boolean(errors.numberVolunteer)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>Thời gian diễn ra</Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='timeTakePlace'
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  size='small'
                  placeholder='Nhập thời gian diễn ra'
                  InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
                  InputLabelProps={{ sx: { fontSize: '1rem' } }}
                  inputProps={{ style: { fontSize: '1rem' } }}
                  error={Boolean(errors.timeTakePlace)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>Địa điểm</Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='location'
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  size='small'
                  placeholder='Nhập địa điểm'
                  InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
                  InputLabelProps={{ sx: { fontSize: '1rem' } }}
                  inputProps={{ style: { fontSize: '1rem' } }}
                  error={Boolean(errors.location)}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h5' fontWeight={400}>Tải hình ảnh</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name='listImageFile'
                render={({ field: { onChange, value } }) => (
                  <Grid container spacing={2} alignItems='flex-start'>
                    {value.map((file, index) => (
                      <Grid item xs='auto' key={index}>
                        <ImagePreview
                          file={file}
                          onRemove={() => onChange(value.filter((_, idx) => idx !== index))}
                        />
                      </Grid>
                    ))}

                    <Grid item xs='auto'>
                      <UploadImage
                        onUploadImage={(file) => {
                          onChange([...value, file])
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NewCampaign