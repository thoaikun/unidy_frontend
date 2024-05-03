'use client'

import Image from 'next/image'
import { Card, CardContent, Divider, Grid, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { CampaignHistoryType } from '@/type/campaign'
import api from '@/service/api'
import { toast } from 'react-toastify'

const ranks: string[] = [
  '/images/dashboard/certificate/green-rank.svg',
  '/images/dashboard/certificate/gray-rank.svg',
  '/images/dashboard/certificate/blue-rank.svg',
  '/images/dashboard/certificate/gray-rank.svg'
]

const Certificate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<CampaignHistoryType[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/users/campaigns', {
          params: {
            pageNumber: 0,
            pageSize: 4,
          }
        })

        setData(response.data)
        setIsLoading(false)
      }
      catch (error: any) {
        toast.error(error?.data?.error)
      }
    })()
  }, [])

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
              <Typography variant='h6' color={(theme) => theme.palette.warning[400]}>Ông hoàng từ thiện</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ mx: 2 }} />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Typography fontWeight={500}>Các hoạt động đã tham gia</Typography>
          </Grid>

          {(() => {
            if (isLoading) {
              return (
                <Grid item container spacing={2}>
                  <Grid item xs='auto'>
                    <Skeleton variant='circular' width={32} height={32} animation='wave' />
                  </Grid>

                  <Grid item xs container alignItems='center'>
                    <Grid item xs={12}>
                      <Typography variant='body2'><Skeleton width='50%' animation='wave' /></Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant='body2'><Skeleton width='50%' animation='wave' /></Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )
            }
            else {
              return (
                data.map(({ campaign, campaignId }, index) => (
                  <Grid item container spacing={2} key={campaignId}>
                    <Grid item xs='auto'>
                      <Image src={ranks[index]} alt='rank' width={32} height={32} />
                    </Grid>

                    <Grid item xs container alignItems='center'>
                      <Grid item xs={12}>
                        <Typography variant='body2' color={(theme) => theme.palette.text.primary}>{campaign.title}</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant='body2' color={(theme) => theme.palette.text.secondary}>Tại: {campaign.location}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              )
            }
          })()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Certificate