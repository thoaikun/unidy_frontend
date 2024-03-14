import Link from 'next/link'
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material'
import { Control, Controller, FieldErrors } from 'react-hook-form'

interface IProps {
  control: Control<any>
  errors: FieldErrors<any>
  handleNext: () => void
  handleBack: () => void
}

const AccountInformation = ({ control, errors, handleNext, handleBack }: IProps) => {
  const theme = useTheme()

  return (
    <Grid container spacing={3} maxWidth={567} flexDirection='column'>
      <Grid item mb={2}>
        <Typography variant='h2' fontWeight={600}>
          Đăng ký tài khoản
        </Typography>

        <Typography variant='h4' color={theme.palette.text.secondary} mt={1}>
          Nhập email và mật khẩu cho tài khoản của bạn
        </Typography>
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              type='email'
              placeholder='Nhập email của bạn'
              label='Email'
              InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
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
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              type='password'
              placeholder='Nhập mật khẩu của bạn'
              label='Mật khẩu'
              InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' } }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.password)}
            />
          )}
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
          onClick={handleBack}
        >
          <Typography fontWeight={700} color='primary'>QUAY LẠI</Typography>
        </Button>

        <Button
          variant='contained'
          sx={{ width: 180, height: 50 }}
          disableElevation
          onClick={handleNext}
        >
          <Typography fontWeight={700} color='#ffffff'>TIẾP TỤC</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default AccountInformation