'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material'

const LogInPage = () => {
  const theme = useTheme()
  const router = useRouter()

  const handleSubmit = () => {
    router.replace('/home')
  }

  return (
    <Grid container spacing={3} maxWidth={567} flexDirection='column'>
      <Grid item mb={2}>
        <Typography variant='h3'>
          Đăng nhập
        </Typography>
        <Typography variant='h4' color={theme.palette.text.secondary} mt={1}>
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
          InputProps={{ sx: { backgroundColor: '#ffffff' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          size='medium'
          type='password'
          placeholder='Nhập mật khẩu của bạn'
          label='Mật khẩu'
          InputProps={{ sx: { backgroundColor: '#ffffff' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>
      <Grid item container justifyContent='space-between'>
        <Link href='/forgot-password'>
          <Typography variant='h6' color={theme.palette.primary.main}>Quên mật khẩu?</Typography>
        </Link>
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
          sx={{ width: 180, height: 50 }}
          disableElevation
          onClick={handleSubmit}
        >
          <Typography fontWeight={700} color='#ffffff'>Đăng nhập</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default LogInPage