import CampaignCard from "@/component/campaign-card"
import ListSponsor from "@/component/list-sponsor"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import Image from "next/image"

const tempData = [
  {
    image: '/images/dollar-1.svg',
    alt: 'dollar-icon',
    title: '500 triệu đồng',
    subTitle: 'Số tiền nhận được',
  },
  {
    image: '/icons/friend-primary.svg',
    alt: 'friend-icon',
    title: '500 triệu đồng',
    subTitle: 'Số tiền nhận được',
  },
  {
    image: '/icons/today.svg',
    alt: 'today-icon',
    title: '500 triệu đồng',
    subTitle: 'Số tiền nhận được',
  },
  {
    image: '/images/dollar-1.svg',
    alt: 'dollar-icon',
    title: '500 triệu đồng',
    subTitle: 'Số tiền nhận được',
  },
]

const HomeOrganization = () => {
  return (
    <Grid container spacing={8}>
      <Grid item xs container spacing={4}>
        <Grid item xs={12}>
          <Typography variant='h5'>Hoạt động gần đây</Typography>
        </Grid>

        <Grid item xs={12} container spacing={4} wrap='nowrap'>
          {new Array(3).fill('').map((value, index) => (
            <Grid item key={index}>
              <CampaignCard />
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2} m={0} sx={{ backgroundColor: '#ffffff' }} >
            <Grid item xs={12}>
              <Typography variant='h5'>Thông số</Typography>
            </Grid>
            <Grid item xs={12}>
              <Image src='/examples/campaign-detail-chart.svg' alt='media' width={700} height={292} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs='auto' container flexDirection='column' spacing={4}>
        <Grid item>
          <ListSponsor />
        </Grid>

        <Grid item container spacing={2} width={432}>
          {tempData.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Card>
                <CardContent>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={45}
                    height={45}
                  />
                  <Typography>{item.title}</Typography>
                  <Typography>{item.subTitle}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HomeOrganization