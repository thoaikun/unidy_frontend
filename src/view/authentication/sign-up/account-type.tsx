import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

interface Props {
  setStep: Dispatch<SetStateAction<number>>
}

type UserType = 'volunteer' | 'sponsor' | 'organization'

interface ButtonProps {
  key: UserType
  image: string
  selectedImage: string
  alt: string
  title: string
  subtitle: string
}

const ButtonDetails: ButtonProps[] = [{
  key: 'volunteer',
  image: '/images/heart-1.svg',
  selectedImage: '/images/heart-2.svg',
  alt: 'heart',
  title: 'Người thiện nguyện',
  subtitle: 'Tham gia các chương trình từ thiện',
}, {
  key: 'sponsor',
  image: '/images/dollar-1.svg',
  selectedImage: '/images/dollar-2.svg',
  alt: 'dollar',
  title: 'Nhà hảo tâm',
  subtitle: 'Ủng hộ tiền cho các chương trình từ thiện',
}, {
  key: 'organization',
  image: '/images/building-1.svg',
  selectedImage: '/images/building-2.svg',
  alt: 'building',
  title: 'Nhà tổ chức',
  subtitle: 'Tổ chức các hoạt động từ thiện',
}]

const AccountType = ({ setStep }: Props) => {
  const theme = useTheme()
  const [selectedType, setSelectedType] = useState<UserType>()

  const handleSelectType = useCallback((type: UserType) => () => {
    setSelectedType(type)
  }, [])

  const handleSubmit = useCallback(() => {
    if (!selectedType) {

    } else if (selectedType === 'volunteer') {
      setStep(2.1)
    } else {
      setStep(2.2)
    }
  }, [selectedType, setStep])

  return (
    <Box maxWidth={567}>
      <Typography variant='h4' fontWeight='bold'>
        Bạn là ...
      </Typography>
      <Typography color={theme.palette.text.secondary} my={1}>
        Chọn loại tài khoản mà bạn muốn đăng ký
      </Typography>

      <Grid container spacing={2} mt={4}>
        {ButtonDetails.map((item) =>
          <Grid item width={1} key={item.key}>
            <Button
              fullWidth
              startIcon={
                <Image
                  src={item.key !== selectedType ? item.image : item.selectedImage}
                  alt={item.alt}
                  width={45}
                  height={45}
                />
              }
              sx={{
                backgroundColor: item.key !== selectedType ? 'white' : theme.palette.primary[100],
                p: 4,
                py: 3,
                borderRadius: 2,
                border: item.key !== selectedType ? '1px solid white' : `1px solid ${theme.palette.primary.main}`
              }}
              onClick={handleSelectType(item.key)}
            >
              <Grid container flexDirection='column' alignItems='flex-start' color='black' ml={2}>
                <Typography textTransform='none'>
                  {item.title}
                </Typography>
                <Typography variant='caption' color={theme.palette.text.secondary} textTransform='none'>
                  {item.subtitle}
                </Typography>
              </Grid>
            </Button>
          </Grid>
        )}

        <Grid container item justifyContent='flex-end'>
          <Typography>
            Đã có tài khoản?&nbsp;
            <Link href={'/log-in'} style={{ color: theme.palette.primary.main }}>Đăng nhập ngay</Link>
          </Typography>
        </Grid>

        <Grid container item justifyContent='flex-end'>
          <Button variant='contained' sx={{ px: 6, py: 1 }} disableElevation onClick={handleSubmit}>
            <Typography variant='body2' fontWeight='bold'>ĐI THÔI</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AccountType