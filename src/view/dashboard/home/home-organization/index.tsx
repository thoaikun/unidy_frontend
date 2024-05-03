'use client'

import ListSponsors from "@/component/list-sponsors"
import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material"
import Image from "next/image"
import RecentActivities from "./recent-activities"
import { useAppSelector } from "@/lib/hook"
import { numberToVND } from "@/utils/number-to-vnd"
import { shortenNumber } from "@/utils/shorten-number"

const HomeOrganization = () => {
  const { status, user } = useAppSelector((state) => state.auth)
  return (
    <Grid container spacing={8}>
      <Grid item xs>
        <RecentActivities />
      </Grid>

      <Grid item width={452}>
        <Grid container spacing={4} position='sticky' top={96}>
          <Grid item xs={12}>
            <ListSponsors />
          </Grid>


          {(() => {
            if (status !== 'succeeded') {
              return (
                [0, 1, 2, 3].map((item) => (
                  <Grid item xs={6} key={item}>
                    <Card>
                      <CardContent>
                        <Skeleton variant='rounded' width={45} height={45} animation='wave' />
                        <Typography><Skeleton width='50%' animation='wave' /></Typography>
                        <Typography variant='body2'><Skeleton width='75%' animation='wave' /></Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )
            }
            else if (user) {
              return (
                [
                  {
                    image: '/images/authentication/sign-up/dollar.svg',
                    title: 'Tổng tiền nhận được',
                    value: numberToVND(user.overallFigure.totalTransaction)
                  },
                  {
                    image: '/images/dashboard/home/organization/volunteer.svg',
                    title: 'Tổng số người tham gia',
                    value: shortenNumber(user.overallFigure.totalVolunteer, 'người')
                  },
                  {
                    image: '/images/dashboard/home/organization/today.svg',
                    title: 'Tổng số chiến dịch',
                    value: shortenNumber(user.overallFigure.totalCampaign, 'chiến dịch')
                  },
                  {
                    image: '/images/authentication/sign-up/dollar.svg',
                    title: 'Nhận được hôm nay',
                    value: numberToVND(user.overallFigure.totalTransactionInDay)
                  },
                ].map(({ image, title, value }, index) => (
                  <Grid item xs={6} key={index}>
                    <Card>
                      <CardContent>
                        <Image src={image} alt='icon' width={45} height={45} />
                        <Typography>{value}</Typography>
                        <Typography variant='body2' color={(theme) => theme.palette.text.secondary}>
                          {title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )
            }
          })()}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HomeOrganization