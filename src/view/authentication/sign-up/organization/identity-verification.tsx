import { Button, Grid, Typography, useTheme } from '@mui/material'
import { formData } from '.'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import Image from 'next/image'

interface Props {
  control: Control<formData>
  errors: FieldErrors<formData>
  handleNext: () => void
  handleBack: () => void
}

const IdentityVerification = ({ control, errors, handleNext, handleBack }: Props) => {
  const theme = useTheme()

  return (
    <Grid container spacing={5} maxWidth={567}>
      <Grid item xs={12}>
        <Typography variant='h2' fontWeight={600}>
          Vui lòng gửi thông tin xác nhận danh tính của bạn
        </Typography>
        <Typography variant='h4' color={theme.palette.text.secondary} mt={1}>
          Căn cước công dân hoặc minh chứng về doanh nghiệp
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name='proof'
          render={({ field: { onChange, value } }) => (
            <Button
              component='label'
              fullWidth
              startIcon={!value && <Image src='/icons/select-file.svg' alt='select-file' width={20} height={20} />}
              sx={{ height: 200, backgroundColor: '#ffffff' }}
              variant='outlined'
            >
              {value ? value.substring(value.lastIndexOf('\\') + 1) : 'Chọn file'}
              <input type='file' onChange={onChange} style={{ display: 'none' }} />
            </Button>
          )}
        />
      </Grid>

      <Grid item xs={12} container justifyContent='flex-end'>
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

export default IdentityVerification