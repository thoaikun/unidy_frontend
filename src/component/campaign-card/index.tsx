import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

const CampaignCard = () => {
  return (
    <Card sx={{ width: 290, borderRadius: 2, position: 'relative' }}>
      <CardMedia
        sx={{ height: 200 }}
        image='/examples/post-media-2.webp'
      />
      <Box sx={{ position: 'absolute', top: 10, left: 14, backgroundColor: '#FFFFFF', borderRadius: 1, p: 0.5 }}>
        <Typography variant='caption' color='inherit'>CÒN LẠI: 25 NGÀY</Typography>
      </Box>
      <Image src='/examples/campaign-progress.svg' alt='campaigb-progess' width={45} height={45} style={{ position: 'absolute', top: 178, right: 20 }} />

      <CardHeader title={<Typography fontWeight={600}>Trồng cây gây rừng</Typography>} />

      <CardContent>
        <Grid container>
          <Grid item xs container flexDirection='column' alignItems='center'>
            <Typography variant='caption' fontWeight={600} color='inherit'>Đã ủng hộ</Typography>
            <Typography variant='caption' color='inherit'>145 triệu đồng</Typography>
          </Grid>
          <Grid item xs container flexDirection='column' alignItems='center'>
            <Typography variant='caption' fontWeight={600} color='inherit'>Mục tiêu</Typography>
            <Typography variant='caption' color='inherit'>175 triệu đồng</Typography>
          </Grid>
          <Grid item xs container flexDirection='column' alignItems='center'>
            <Typography variant='caption' fontWeight={600} color='inherit'>Tình nguyện viên</Typography>
            <Typography variant='caption' color='inherit'>100 người</Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Link href='/campaign/1' style={{ width: '100%' }}>
          <Button fullWidth variant='outlined'>
            <Typography variant='body2' color='primary'>Cập nhật sự kiện</Typography>
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default CampaignCard