import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material';

interface Props {
  setStep: Dispatch<SetStateAction<number>>
}

const RegisterAccount = ({ setStep }: Props) => {
  const theme = useTheme()

  return (
    <Grid
      container
      spacing={4}
      maxWidth={567}
      flexDirection='column'
    >
      <Grid item>
        <Typography fontSize='2rem'>
          Đăng ký tài khoản
        </Typography>
        <Typography
          variant='h6'
          color={theme.palette.text.secondary}
          my={1}
        >Nhập email và mật khẩu cho tài khoản của
          bạn </Typography>
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
      <Grid
        container
        item
        justifyContent='flex-end'
      >
        <Typography>
          Đã có tài khoản?&nbsp;
          <Link
            href='/log-in'
            style={{ color: theme.palette.primary.main }}
          >Đăng nhập ngay</Link>
        </Typography>
      </Grid>
      <Grid
        container
        item
        justifyContent='flex-end'
      >
        <Button
          variant='outlined'
          sx={{ mr: 2 }}
          onClick={() => setStep(1)}
        >QUAY LẠI</Button>
        <Button
          variant='contained'
          sx={{ px: 6, py: 1 }}
          disableElevation
          onClick={() => setStep(3)}
        >TIẾP TỤC</Button>
      </Grid>
    </Grid>
  )
}

export default RegisterAccount