import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material'

const NewPasswordForm = () => {
  const theme = useTheme()
  const router = useRouter()

  const handleSubmit = () => {
    router.replace('/log-in')
  }

  return (
    <Grid container spacing={2} maxWidth={567} flexDirection='column'>
      <Grid item mb={2}>
        <Typography variant='h4' fontWeight='bold'>
          Mật khẩu mới
        </Typography>
        <Typography color={theme.palette.text.secondary} my={1}>
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
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          size='medium'
          type='password'
          placeholder='Nhập lại mật khẩu mới'
          label='Xác nhận mật khẩu mới'
        />
      </Grid>
      <Grid container item justifyContent='flex-end'>
        <Link href='/log-in'>
          <Button variant='outlined' sx={{ mr: 2, py: 1 }}>
            QUAY LẠI
          </Button>
        </Link>
        <Button variant='contained' sx={{ px: 6, py: 1 }} disableElevation onClick={handleSubmit}>
          XÁC NHẬN
        </Button>
      </Grid>
    </Grid>
  )
}

export default NewPasswordForm