import Link from 'next/link'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material'

interface Props {
  setStep: Dispatch<SetStateAction<number>>
}

const InformationForm = ({ setStep }: Props) => {
  const theme = useTheme()

  const handleSubmit = useCallback(() => {
    setStep(1)
  }, [setStep])

  return (
    <Grid container spacing={3} maxWidth={567} flexDirection='column'>
      <Grid item mb={2}>
        <Typography variant='h2' fontWeight={600}>
          Quên mật khẩu
        </Typography>

        <Typography variant='h4' color={theme.palette.text.secondary} mt={1}>
          Nhập email đã đăng ký với tài khoản của bạn
        </Typography>
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          size='medium'
          type='email'
          placeholder='Nhập email của bạn'
          label='Email'
          InputProps={{ sx: { backgroundColor: '#ffffff' }, endAdornment: <Button sx={{ width: 100 }}>Lấy OTP</Button> }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          size='medium'
          placeholder='Nhập OTP'
          label='Mã OTP'
          InputProps={{ sx: { backgroundColor: '#ffffff' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>

      <Grid item container justifyContent='flex-end' alignItems='center' mt={2}>
        <Link href='/log-in'>
          <Button variant='outlined' sx={{ width: 120, height: 50, mr: 2 }}>
            <Typography fontWeight={700} color='primary'>QUAY LẠI</Typography>
          </Button>
        </Link>

        <Button
          variant='contained'
          sx={{ width: 180, height: 50 }}
          disableElevation
          onClick={handleSubmit}
        >
          <Typography fontWeight={700} color='#ffffff'>XÁC NHẬN</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default InformationForm