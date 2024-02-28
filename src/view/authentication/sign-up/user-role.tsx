import Image from 'next/image'
import { useTheme, Grid, Box, Typography, Button } from '@mui/material'
import Introduction from '@/component/introduction'
import { UserRoleType } from '@/type/user'
import Link from 'next/link'

interface IProps {
  role?: UserRoleType
  handleSelectRole: (selectedRole: UserRoleType) => () => void
  handleSubmit: () => void
}

interface ButtonProps {
  key: UserRoleType
  image: string
  selectedImage: string
  alt: string
  title: string
  subtitle: string
}

const ButtonDetails: ButtonProps[] = [{
  key: 'VOLUNTEER',
  image: '/images/heart-1.svg',
  selectedImage: '/images/heart-2.svg',
  alt: 'heart',
  title: 'Người thiện nguyện',
  subtitle: 'Tham gia các chương trình từ thiện',
}, {
  key: 'SPONSOR',
  image: '/images/dollar-1.svg',
  selectedImage: '/images/dollar-2.svg',
  alt: 'dollar',
  title: 'Nhà hảo tâm',
  subtitle: 'Ủng hộ tiền cho các chương trình từ thiện',
}, {
  key: 'ORGANIZATION',
  image: '/images/building-1.svg',
  selectedImage: '/images/building-2.svg',
  alt: 'building',
  title: 'Nhà tổ chức',
  subtitle: 'Tổ chức các hoạt động từ thiện',
}]

const UserRole = ({ role, handleSelectRole, handleSubmit }: IProps) => {
  const theme = useTheme()

  return (
    <Grid container height={1}>
      <Grid item width={500} display={{ xs: 'none', lg: 'block' }} sx={{ backgroundColor: '#ffffff' }}>
        <Introduction />
      </Grid>

      <Grid
        item
        xs
        container
        sx={{ backgroundColor: theme.palette.primary[50] }}
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        p={4}
      >
        <Box display={{ xs: 'none', lg: 'block' }}><Image src='images/logo-big.svg' alt='logo' width={200} height={60} /></Box>
        <Box display={{ xs: 'block', lg: 'none' }}><Image src='images/logo-small.svg' alt='logo' width={73} height={76} /></Box>

        <Box maxWidth={567} mt={10}>
          <Typography variant='h2' fontWeight={600}>
            Bạn là ...
          </Typography>

          <Typography variant='h4' color={theme.palette.text.secondary} mt={1}>
            Chọn loại tài khoản mà bạn muốn đăng ký
          </Typography>

          <Grid container spacing={2} mt={4}>
            {ButtonDetails.map((item, index) =>
              <Grid item width={1} key={index}>
                <Button
                  fullWidth
                  startIcon={
                    <Image
                      src={item.key !== role ? item.image : item.selectedImage}
                      alt={item.alt}
                      width={45}
                      height={45}
                    />
                  }
                  sx={{
                    backgroundColor: item.key !== role ? '#ffffff' : theme.palette.primary[100],
                    p: 4,
                    py: 3,
                    borderRadius: 2,
                    border: item.key !== role ? '1px solid white' : `1px solid ${theme.palette.primary.main}`
                  }}
                  onClick={handleSelectRole(item.key)}
                >
                  <Grid container flexDirection='column' alignItems='flex-start' color='black' ml={2}>
                    <Typography variant='h6' textTransform='none'>
                      {item.title}
                    </Typography>

                    <Typography variant='caption' color={theme.palette.text.secondary} textTransform='none'>
                      {item.subtitle}
                    </Typography>
                  </Grid>
                </Button>
              </Grid>
            )}

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
                variant='contained'
                sx={{ width: 180, height: 50 }}
                disableElevation
                onClick={handleSubmit}>
                <Typography fontWeight={700} color='#ffffff'>ĐI THÔI</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export default UserRole