import { Card, CardContent, Divider, Grid, Skeleton, Typography, useTheme } from "@mui/material"
import Image from "next/image"

const CertificateLoading = () => {
  const theme = useTheme()

  return (
    <Card sx={{ px: 2 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Image src='/images/dashboard/list-friends/trophy.svg' alt='trophy' width={28} height={45} />
          </Grid>

          <Grid item xs container alignItems='center'>
            <Grid item xs={12}>
              <Typography variant='h6'>Huân chương của bạn</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h6'><Skeleton width='50%' animation='wave' /></Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ mx: 2 }} />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography fontWeight={500}>Các hoạt động đã tham gia</Typography>
          </Grid>

          {new Array(3).fill(undefined).map((item, index) => (
            <Grid item xs={12} key={index}>
              <Skeleton variant='rounded' height={53.5} animation='wave' />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CertificateLoading