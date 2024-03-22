import { Button, Card, CardActions, CardContent, Divider, Grid, Skeleton, Typography, useTheme } from "@mui/material"

const PersonalInformationLoading = () => {
  const theme = useTheme()

  return (
    <Card sx={{ p: 1 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography fontWeight={500}><Skeleton width='50%' animation='wave' /></Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Skeleton variant='rounded' height={120} animation='wave' />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ px: 2 }}>
        <Button sx={{ border: '1px dashed #d1d4d7' }} fullWidth disabled>
          <Typography variant='caption' color={theme.palette.text.primary}>Chỉnh sửa thông tin</Typography>
        </Button>
      </CardActions>
    </Card >
  )
}

export default PersonalInformationLoading