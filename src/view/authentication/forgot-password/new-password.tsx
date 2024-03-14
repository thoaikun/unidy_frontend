import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material'
import { useCallback } from 'react'

const NewPasswordForm = () => {
  const theme = useTheme()
  const router = useRouter()

  const handleSubmit = useCallback(() => {
    router.replace('/log-in')
  }, [router])

  return (
    <Grid container spacing={3} maxWidth={567} flexDirection='column'>
      <Grid item mb={2}>
        <Typography variant='h2' fontWeight={600}>
          Mật khẩu mới
        </Typography>

        <Typography variant='h4' color={theme.palette.text.secondary} mt={1}>
          Nhập mật khẩu mới cho tài khoản của bạn
        </Typography>
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          size='medium'
          type='password'
          placeholder='Nhập mật khẩu mới'
          label='Mật khẩu mới'
          InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          size='medium'
          type='password'
          placeholder='Nhập lại mật khẩu mới'
          label='Xác nhận mật khẩu mới'
          InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>

      <Grid item container justifyContent='flex-end' mt={2}>
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

export default NewPasswordForm