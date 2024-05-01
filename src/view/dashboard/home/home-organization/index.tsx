'use client'

import ListSponsors from "@/component/list-sponsors"
import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import Image from "next/image"
import RecentActivities from "./recent-activities"

const tempData = [
  {
    image: '/images/authentication/sign-up/dollar.svg',
    alt: 'dollar-icon',
    title: '500 triệu đồng',
    subTitle: 'Số tiền nhận được',
  },
  {
    image: '/images/dashboard/home/organization/volunteer.svg',
    alt: 'friend-icon',
    title: '500 triệu đồng',
    subTitle: 'Số tiền nhận được',
  },
  {
    image: '/images/dashboard/home/organization/today.svg',
    alt: 'today-icon',
    title: '500 triệu đồng',
    subTitle: 'Số tiền nhận được',
  },
  {
    image: '/images/authentication/sign-up/dollar.svg',
    alt: 'dollar-icon',
    title: '500 triệu đồng',
    subTitle: 'Số tiền nhận được',
  },
]

const HomeOrganization = () => {
  return (
    <Grid container spacing={8}>
      <Grid item sx={{ width: 'calc(100vw - 566px)' }} container spacing={4}>
        <Grid item xs={12}>
          <RecentActivities />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2} m={0} borderRadius={2} sx={{ backgroundColor: '#ffffff' }}>
            <Grid item xs={12}>
              <Typography variant='h5'>Thông số</Typography>
            </Grid>
            <Grid item xs={12} p={4}>
              <Box position='relative' height={350}>
                <Image src='/examples/campaign-detail-chart.svg' alt='media' fill />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs='auto' container flexDirection='column' spacing={4}>
        <Grid item>
          <ListSponsors />
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