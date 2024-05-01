import Link from 'next/link'
import {
  Button,
  Grid,
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

const OrganizationInformation = ({ control, errors, handleNext, handleBack }: Props) => {
  const theme = useTheme()

  return (
    <Grid container spacing={3} maxWidth={567}>
      <Grid item xs={12} mb={2}>
        <Typography variant='h1' fontWeight={600}>
          Thông tin tổ chức
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
              placeholder='Nhập tên công ty'
              label='Tên công ty'
              InputProps={{ sx: { backgroundColor: '#ffffff' } }}
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
          name='dayOfIncorporation'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              type='date'
              label='Ngày thành lập'
              InputProps={{ sx: { backgroundColor: '#ffffff' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' }, shrink: true, }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.dayOfIncorporation)}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name='taxCode'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              placeholder='Nhập mã số thuế'
              label='Mã số thuế'
              InputProps={{ sx: { backgroundColor: '#ffffff' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' } }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.taxCode)}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name='address'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              placeholder='Nhập địa chỉ của công ty'
              label='Địa chỉ'
              InputProps={{ sx: { backgroundColor: '#ffffff' } }}
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
              InputProps={{ sx: { backgroundColor: '#ffffff' } }}
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
          name='contactEmail'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              size='medium'
              placeholder='Nhập email liên hệÏ'
              label='Email liên hệ'
              InputProps={{ sx: { backgroundColor: '#ffffff' } }}
              InputLabelProps={{ sx: { fontSize: '1rem' } }}
              inputProps={{ style: { fontSize: '1rem' } }}
              error={Boolean(errors.contactEmail)}
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

export default OrganizationInformation