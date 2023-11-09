import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material'

interface Props {
  setStep: Dispatch<SetStateAction<number>>
}

const InformationForm = ({ setStep }: Props) => {
  const theme = useTheme()

  return (
    <Grid container spacing={2} maxWidth={567} flexDirection='column'>
      <Grid item mb={2}>
        <Typography variant='h4' fontWeight='bold'>
          Quên mật khẩu
        </Typography>
        <Typography color={theme.palette.text.secondary} my={1}>
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
          InputProps={{ endAdornment: <Button sx={{ width: 100 }}>Lấy OTP</Button> }}
        />
      </Grid>
      <Grid item>
        <TextField fullWidth size='medium' placeholder='Nhập OTP' label='Mã OTP' />
      </Grid>
      <Grid container item justifyContent='flex-end' alignItems='center'>
        <Link href='/log-in'>
          <Button variant='outlined' sx={{ mr: 2, py: 1 }}>
            QUAY LẠI
          </Button>
        </Link>
        <Button variant='contained' sx={{ px: 6, py: 1 }} disableElevation onClick={() => setStep(1)}>
          XÁC NHẬN
        </Button>
      </Grid>
    </Grid>
  )
}

export default InformationForm