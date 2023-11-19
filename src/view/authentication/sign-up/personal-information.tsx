import Link from 'next/link'
import { Dispatch, SetStateAction, useCallback } from 'react'
import {
  Button, FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material'

interface Props {
  setStep: Dispatch<SetStateAction<number>>
}

const PersonalInformation = ({ setStep }: Props) => {
  const theme = useTheme()

  const handleGoBack = useCallback(() => {
    setStep(2)
  }, [setStep])

  const handleSubmit = useCallback(() => {
    setStep(4)
  }, [setStep])

  return (
    <Grid container spacing={3} maxWidth={567}>
      <Grid item xs={12} mb={2}>
        <Typography variant='h2' fontWeight={600}>
          Thông tin cá nhân
        </Typography>

        <Typography variant='h4' color={theme.palette.text.secondary} mt={1}>
          Hãy cho chúng tôi hiểu hơn về bạn
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          size='medium'
          placeholder='Nhập họ và tên của bạn'
          label='Họ và tên'
          InputProps={{ sx: { backgroundColor: '#ffffff' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          size='medium'
          type='date'
          label='Ngày sinh'
          InputProps={{ sx: { backgroundColor: '#ffffff' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' }, shrink: true, }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Giới tính</InputLabel>
          <Select fullWidth label='Giới tính' sx={{ backgroundColor: '#ffffff' }}>
            <MenuItem value={0}>Nam</MenuItem>
            <MenuItem value={1}>Nữ</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          size='medium'
          placeholder='Nhập số điện thoại của bạn'
          label='Số điện thoại'
          InputProps={{ sx: { backgroundColor: '#ffffff' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          size='medium'
          placeholder='Nhập nghề nghiệp của bạn'
          label='Nghề nghiệp'
          InputProps={{ sx: { backgroundColor: '#ffffff' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          size='medium'
          placeholder='Nhập nơi công tác của bạn'
          label='Nơi công tác'
          InputProps={{ sx: { backgroundColor: '#ffffff' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
          inputProps={{ style: { fontSize: '1rem' } }}
        />
      </Grid>

      <Grid item xs={12} container justifyContent='flex-end'>
        <Typography variant='h6' fontWeight={400}>
          Đã có tài khoản?&nbsp;
          <Link href='/log-in' style={{ color: theme.palette.primary.main, fontWeight: 500 }}>
            Đăng nhập ngay
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={12} container justifyContent='flex-end' mt={1}>
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

export default PersonalInformation