'use client'

import { CampaignHistoryType, campaignStatusColor, campaignStatusTitle } from '@/type/campaign'
import { Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material'
import Link from 'next/link'

interface Props {
  data: CampaignHistoryType,
  size?: 'small' | 'medium'
}

const JoinedCard = ({ data: {
  timeJoin,
  campaignId,
  campaign: {
    link_image,
    title,
    status,
    numberVolunteerRegistered,
    numberVolunteer,
  }
}, size = 'medium' }: Props) => {
  const theme = useTheme()

  return (
    <Link href={`/campaign/${campaignId}`}>
      <Card sx={{ width: size === 'medium' ? 400 : 360, borderRadius: 1, display: 'flex' }}>
        <CardMedia component='img' image={link_image || '/examples/post-media-2.webp'} sx={{ width: 150 }} />

        <CardContent>
          <Grid container alignItems='center'>
            <Grid item xs={12}>
              <Typography fontWeight={500}>{title}</Typography>
            </Grid>

            <Grid
              item
              xs='auto'
              container
              alignItems='center'
              px={1}
              my={1}
              borderRadius={1}
              height={18}
              border={(theme) => `1px solid ${theme.palette[campaignStatusColor[status].color][campaignStatusColor[status].main]}`}
              sx={{ backgroundColor: (theme) => theme.palette[campaignStatusColor[status].color][campaignStatusColor[status].background] }}
            >
              <Typography fontSize='0.5rem' color={(theme) => theme.palette[campaignStatusColor[status].color][campaignStatusColor[status].main]}>
                {campaignStatusTitle[status]}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='caption' fontWeight={300}>
                Đăng ký lúc: <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                  {timeJoin ? new Date(timeJoin).toLocaleDateString() : 'Không có thông tin'}
                </span>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='caption' fontWeight={300}>
                Tình nguyện viên <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                  {numberVolunteerRegistered}/{numberVolunteer} người
                </span>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  )
}

export default JoinedCard