import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { Button, Grid, Typography, useTheme } from '@mui/material'

const Success = () => {
  const theme = useTheme()
  const router = useRouter()

  const handleSubmit = useCallback(() => {
    router.push('/log-in')
  }, [router])

  return (
    <>
      <Typography variant='h1' fontWeight={600}>
        Đăng ký thành công
      </Typography>
      <Typography variant='h4' color={theme.palette.text.secondary} mt={1}>
        Tài khoản của bạn đã được tạo, hãy hòa mình vào thế giới của chúng tôi ngay
      </Typography>
      
      <Grid container justifyContent='flex-end' mt={7}>
        <Button
          variant='contained'
          sx={{ width: { xs: 1, lg: 180 }, height: 50 }}
          disableElevation
          onClick={handleSubmit}
        >
          <Typography fontWeight={700} color='#ffffff'>ĐĂNG NHẬP NGAY</Typography>
        </Button>
      </Grid>
    </>
  )
}

export default Success