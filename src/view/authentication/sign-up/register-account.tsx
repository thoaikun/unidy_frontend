import Link from 'next/link'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material'

interface Props {
  setStep: Dispatch<SetStateAction<number>>
}

const RegisterAccount = ({ setStep }: Props) => {
  const theme = useTheme()

  const handleGoBack = useCallback(() => {
    setStep(1)
  }, [setStep])

  const handleSubmit = useCallback(() => {
    setStep(3)
  }, [setStep])

  return (
    <Grid container spacing={3} maxWidth={567} flexDirection='column'>
      <Grid item mb={2}>
        <Typography variant='h2' fontWeight='bold'>
          Đăng ký tài khoản
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

      <Grid item container justifyContent='flex-end'>
        <Typography variant='h6' fontWeight={400}>
          Đã có tài khoản?&nbsp;
          <Link href='/log-in' style={{ color: theme.palette.primary.main, fontWeight: 500 }}>
            Đăng nhập ngay
          </Link>
        </Typography>
      </Grid>

      <Grid item container justifyContent='flex-end' mt={2}>
        <Button
          variant='outlined'
          sx={{ width: 120, height: 50, mr: 2 }}
          onClick={handleGoBack}
        >
          <Typography fontWeight={700} color='primary'>QUAY LẠI</Typography>
        </Button>

        <Button
          variant='contained'
          sx={{ width: 180, height: 50 }}
          disableElevation
          onClick={handleSubmit}
        >
          <Typography fontWeight={700} color='#ffffff'>TIẾP TỤC</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default RegisterAccount