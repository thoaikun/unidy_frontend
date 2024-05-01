import { OrganizationCampaignType } from "@/type/campaign"
import { numberToVND } from "@/utils/number-to-vnd"
import { calculateRemainingTime } from "@/utils/remaining-time"
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material"
import Link from "next/link"
import { theme } from "../theme"

interface Props {
  data: OrganizationCampaignType
}

const CampaignCard = ({
  data: {
    link_image,
    endDate,
    title,
    donationBudget,
    donationBudgetReceived,
    numberVolunteer,
  }
}: Props) => {
  return (
    <Card sx={{ width: 290, borderRadius: 2, position: 'relative' }}>
      <CardMedia
        sx={{ height: 200 }}
        image={link_image ? JSON.parse(link_image)[0] : '/examples/post-media-2.webp'}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 14,
          backgroundColor: '#ffffff',
          borderRadius: 1,
          p: 0.5
        }}>
        <Typography variant='caption' color='inherit' textTransform='uppercase'>
          Còn lại: {calculateRemainingTime(endDate)}
        </Typography>
      </Box>

      <Box
        width={45}
        height={45}
        padding={0.5}
        position='absolute'
        top={178}
        right={20}
        borderRadius={6}
        border={`1px solid ${theme.palette.primary.main}`}
      >
        <Grid
          container
          width={1}
          height={1}
          borderRadius={5}
          justifyContent='center'
          alignItems='center'
          sx={{ backgroundColor: 'primary.main' }}
        >
          <Typography fontWeight={500} color='text.contrast'>{Math.round((donationBudgetReceived || 0) / donationBudget * 100)}%</Typography>
        </Grid>
      </Box>

      <CardHeader title={<Typography fontWeight={600}>{title}</Typography>} />

      <CardContent>
        <Grid container>
          <Grid item xs container flexDirection='column' alignItems='center'>
            <Typography variant='caption' fontWeight={300} color='inherit'>Đã ủng hộ</Typography>
            <Typography variant='caption' color='inherit'>{numberToVND(donationBudgetReceived)}</Typography>
          </Grid>
          <Grid item xs container flexDirection='column' alignItems='center'>
            <Typography variant='caption' fontWeight={300} color='inherit'>Mục tiêu</Typography>
            <Typography variant='caption' color='inherit'>{numberToVND(donationBudget)}</Typography>
          </Grid>
          <Grid item xs container flexDirection='column' alignItems='center'>
            <Typography variant='caption' fontWeight={300} color='inherit'>Tình nguyện viên</Typography>
            <Typography variant='caption' color='inherit'>{numberVolunteer} người</Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Link href='/campaigns/1' style={{ width: '100%' }}>
          <Button fullWidth variant='outlined'>
            <Typography variant='body2' color='primary'>Cập nhật sự kiện</Typography>
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default CampaignCard