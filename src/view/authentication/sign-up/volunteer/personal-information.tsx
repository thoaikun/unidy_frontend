import Link from 'next/link'
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
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { formData } from '.'

interface Props {
  control: Control<formData>
  errors: FieldErrors<formData>
  handleNext: () => void
  handleBack: () => void
}

const PersonalInformation = ({ control, errors, handleNext, handleBack }: Props) => {
  const theme = useTheme()

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
        <Controller
          control={control}
          name='fullName'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              placeholder='Nhập họ và tên của bạn'
              label='Họ và tên'
              InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' } }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.fullName)}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name='dayOfBirth'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              type='date'
              label='Ngày sinh'
              InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' }, shrink: true, }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.dayOfBirth)}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name='sex'
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl fullWidth>
              <InputLabel sx={{ fontSize: '1rem' }}>Giới tính</InputLabel>
              <Select
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                fullWidth
                label='Giới tính'
                sx={{ backgroundColor: '#ffffff', fontSize: '1rem' }}
                error={Boolean(errors.sex)}
              >
                <MenuItem value='MALE'>Nam</MenuItem>
                <MenuItem value='FEMALE'>Nữ</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name='phone'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              placeholder='Nhập số điện thoại của bạn'
              label='Số điện thoại'
              InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' } }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.phone)}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name='job'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              placeholder='Nhập nghề nghiệp của bạn'
              label='Nghề nghiệp'
              InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' } }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.job)}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name='workLocation'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              placeholder='Nhập nơi công tác của bạn'
              label='Nơi công tác'
              InputProps={{ sx: { backgroundColor: '#ffffff', fontSize: '1rem' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' } }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.workLocation)}
            />
          )}
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

export default PersonalInformation