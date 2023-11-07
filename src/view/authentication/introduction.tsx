'use client'

import Image from 'next/image';
import { Box, Grid, Typography, useTheme } from '@mui/material';

const Introduction = () => {
  const theme = useTheme()

  return (
    <Grid container sx={{ backgroundColor: theme.palette.primary.main }} height={1} p={4}>
      <Grid container item maxWidth={300} alignItems='flex-end'>
        <Box>
          <Typography variant='h4' fontWeight='bold' color='white' lineHeight={1.5} mb={1}>
            Tham gia cùng chúng tôi
          </Typography>
          {['Start where you are', 'Use what you have', 'Do what you can'].map((item) =>
            <Typography color='white' fontWeight='lighter' key={item}>{item}</Typography>
          )}
        </Box>
      </Grid>
      <Grid container item justifyContent='flex-end' alignItems='center'>
        <Image src='/images/ballon.svg' alt='ballon' height={300} width={265} />
      </Grid>
    </Grid>
  )
}

export default Introduction