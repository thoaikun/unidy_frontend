import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Button, FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setStep: Dispatch<SetStateAction<number>>
}

const PersonalInformation = ({ setStep }: Props) => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Grid container spacing={2} maxWidth={567}>
      <Grid item xs={12} mb={2}>
        <Typography variant='h4' fontWeight='bold'>
          Thông tin cá nhân
        </Typography>
        <Typography color={theme.palette.text.secondary} my={1}>
          Hãy cho chúng tôi hiểu hơn về bạn
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size='medium'
          placeholder='Nhập họ và tên của bạn'
          label='Họ và tên'
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          size='medium'
          type='date'
          label='Ngày sinh'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Giới tính</InputLabel>
          <Select fullWidth label='Giới tính'>
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
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size='medium'
          placeholder='Nhập nghề nghiệp của bạn'
          label='Nghề nghiệp'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size='medium'
          placeholder='Nhập nơi công tác của bạn'
          label='Nơi công tác'
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
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
        xs={12}
        justifyContent='flex-end'
      >
        <Button variant='outlined' sx={{ mr: 2 }} onClick={() => setStep(2)}>
          QUAY LẠI
        </Button>
        <Button
          variant='contained'
          sx={{ px: 6, py: 1 }}
          disableElevation
          onClick={() => router.replace('/')}
        >
          TIẾP TỤC
        </Button>
      </Grid>
    </Grid>
  )
}

export default PersonalInformation