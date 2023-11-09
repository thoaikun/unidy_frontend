'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material';

const LogInForm = () => {
  const theme = useTheme()
  const router = useRouter()

  const handleSubmit = () => {
    router.replace('/')
  }

  return (
    <Grid container spacing={2} maxWidth={567} flexDirection='column'>
      <Grid item mb={2}>
        <Typography variant='h4' fontWeight='bold'>
          Đăng nhập
        </Typography>
        <Typography color={theme.palette.text.secondary} my={1}>
          Nhập email và mật khẩu cho tài khoản của bạn
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          size='medium'
          type='email'
          placeholder='Nhập email của bạn'
          label='Email'
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          size='medium'
          type='password'
          placeholder='Nhập mật khẩu của bạn'
          label='Mật khẩu'
        />
      </Grid>
      <Grid container item justifyContent='space-between'>
        <Link href={'/forgot-password'} style={{ color: theme.palette.primary.main }}>
          Quên mật khẩu?
        </Link>
        <Typography>
          Chưa có tài khoản?&nbsp;
          <Link href={'/sign-up'} style={{ color: theme.palette.primary.main }}>
            Đăng ký ngay
          </Link>
        </Typography>
      </Grid>
      <Grid container item justifyContent='flex-end'>
        <Button variant='contained' sx={{ px: 6, py: 1 }} disableElevation onClick={handleSubmit}>
          Đăng nhập
        </Button>
      </Grid>
    </Grid>
  )
}

export default LogInForm