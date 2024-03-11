'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { object, string } from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '@/service/api'
import { setCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { fetchUser } from '@/lib/features/auth/authSlice'

interface formData {
  email: string
  password: string
}

const defaultValues: formData = {
  email: '',
  password: '',
}

const schema = object({
  email: string().email().required(),
  password: string().required(),
})

const LogInPage = () => {
  const theme = useTheme()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(async (data: formData) => {
    try {
      const response = await api.post('/auth/authenticate', data)

      setCookie('access_token', response.data.access_token)
      setCookie('refresh_token', response.data.refresh_token)
      setCookie('role', response.data.role)
      localStorage.setItem('isChosenFavorite', response.data.isChosenFavorite)

      dispatch(fetchUser())
      router.replace('/home')
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [dispatch, router])

  return (
    <Grid container spacing={3} maxWidth={567} flexDirection='column'>
      <Grid item mb={2}>
        <Typography variant='h2'>
          Đăng nhập
        </Typography>

        <Typography variant='h4' color={theme.palette.text.secondary} mt={1}>
          Nhập email và mật khẩu cho tài khoản của bạn
        </Typography>
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              fullWidth
              size='medium'
              type='email'
              placeholder='Nhập email của bạn'
              label='Email'
              InputProps={{ sx: { backgroundColor: '#ffffff' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' } }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.email)}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              fullWidth
              size='medium'
              type='password'
              placeholder='Nhập mật khẩu của bạn'
              label='Mật khẩu'
              InputProps={{ sx: { backgroundColor: '#ffffff' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' } }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.password)}
            />
          )}
        />
      </Grid>

      <Grid item container justifyContent={{ xs: 'flex-end', lg: 'space-between' }}>
        <Box display={{ xs: 'none', lg: 'block' }}>
          <Link href='/forgot-password'>
            <Typography variant='h6' color={theme.palette.primary.main}>Quên mật khẩu?</Typography>
          </Link>
        </Box>

        <Typography variant='h6' fontWeight={400}>
          Chưa có tài khoản?&nbsp;
          <Link href='/sign-up' style={{ color: theme.palette.primary.main, fontWeight: 500 }}>
            Đăng ký ngay
          </Link>
        </Typography>
      </Grid>

      <Grid item container justifyContent='flex-end' mt={2}>
        <Button
          variant='contained'
          sx={{ width: { xs: 1, lg: 180 }, height: 50 }}
          disableElevation
          onClick={handleSubmit(onSubmit)}
        >
          <Typography fontWeight={700} color='#ffffff'>Đăng nhập</Typography>
        </Button>
      </Grid>

      <Grid item container display={{ xs: 'flex', lg: 'none' }} justifyContent='center'>
        <Link href='/forgot-password'>
          <Typography variant='h6' color={theme.palette.primary.main}>Quên mật khẩu?</Typography>
        </Link>
      </Grid>
    </Grid>
  )
}

export default LogInPage