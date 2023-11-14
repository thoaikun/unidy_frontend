'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Box, Grid, Typography, useTheme } from '@mui/material'

const title: {
  [field: string]: string
} = {
  '/sign-up': 'Tham gia cùng chúng tôi',
  '/log-in': 'Chào mừng bạn quay lại',
  '/forgot-password': 'Chào mừng bạn quay lại',
}

const Introduction = () => {
  const pathname = usePathname()
  const theme = useTheme()

  return (
    <Grid container sx={{ backgroundColor: theme.palette.primary.main }} height={1} p={4}>
      <Grid item container maxWidth={350} alignItems='flex-end'>
        <Box>
          <Typography variant='h3' color='#ffffff' mb={1}>
            {title[pathname]}
          </Typography>
          {['Start where you are', 'Use what you have', 'Do what you can'].map(item =>
            <Typography variant='h5' color='#ffffff' fontWeight={300} key={item}>
              {item}
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item container justifyContent='flex-end' alignItems='center'>
        <Image src='/images/ballon.svg' alt='ballon' height={300} width={265} priority />
      </Grid>
    </Grid>
  )
}

export default Introduction