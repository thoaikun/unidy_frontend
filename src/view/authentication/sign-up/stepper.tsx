import Image from 'next/image'
import { Grid, Typography, useTheme } from '@mui/material'

interface Props {
  isVolunteer: boolean
  step: number
}

const volunteerSteps = ['Loại tài khoản', 'Đăng ký tài khoản', 'Thông tin cá nhân']
const organizationSteps = ['Loại tài khoản', 'Đăng ký tài khoản', 'Thông tin tổ chức', 'Xác nhận danh tính']

const CustomStepper = ({ isVolunteer, step }: Props) => {
  const theme = useTheme()

  return (
    <Grid container height={1} p={10} justifyContent='center' flexDirection='column' spacing={6}>
      {(isVolunteer ? volunteerSteps : organizationSteps).map((item, index) => (
        <Grid item container alignItems='center' key={index}>
          {Math.floor(step) > index + 1 ?
            <Image src='/images/completed.svg' alt='completed' height={30} width={30} /> :
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              border={`1.5px solid ${Math.floor(step) === index + 1 ? theme.palette.primary.main : theme.palette.secondary.main}`}
              borderRadius={4}
              width={30}
              height={30}
            >
              <Typography
                variant='h5'
                color={Math.floor(step) === index + 1 ? theme.palette.primary.main : 'default'}
                fontWeight={500}
              >
                {index + 1}
              </Typography>
            </Grid>}

          <Typography
            variant='h5'
            color={Math.floor(step) > index + 1 ? 'secondary' : Math.floor(step) === index + 1 ? 'primary' : 'default'}
            ml={2}
          >
            {item}
          </Typography>
        </Grid>
      ))}

      <Image
        src='/images/polygon-2.svg'
        alt='polygon'
        height={135}
        width={480}
        style={{ position: 'absolute', bottom: 0, left: 0 }}
      />

      <Image
        src='/images/polygon-1.svg'
        alt='polygon'
        height={201}
        width={342}
        style={{ position: 'absolute', bottom: 0, left: 0 }}
      />
    </Grid>
  )
}

export default CustomStepper