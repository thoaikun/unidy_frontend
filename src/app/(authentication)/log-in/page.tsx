'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useState } from 'react'
import { Box, Button, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

const LogInPage = () => {
  const theme = useTheme()
  const router = useRouter()

  const [email, setEmail] = useState<string>()

  const handleChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }, [])

  const handleSubmit = useCallback(() => {
    if (email === 'organization@gmail.com') {
      localStorage.setItem('type', 'organization')
    }
    else {
      localStorage.setItem('type', 'personal')
    }
    router.replace('/home')
  }, [email, router])

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
        <TextField
          fullWidth
          size='medium'
          type='email'
          placeholder='Nhập email của bạn'
          label='Email'
          InputProps={{ sx: { backgroundColor: '#ffffff' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
          value={email}
          onChange={handleChangeEmail}
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
          onClick={handleSubmit}
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