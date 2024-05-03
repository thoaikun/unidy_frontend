'use client'

import { OrganizationCampaignType, campaignStatusColor, campaignStatusTitle } from '@/type/campaign'
import { numberWithDots } from '@/utils/number-with-dots'
import { Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material'
import Link from 'next/link'

interface Props {
  data: OrganizationCampaignType,
}

const JoinedCardOrganization = ({ data: {
  campaignId,
  link_image,
  title,
  status,
  donationBudgetReceived,
  donationBudget,
  numberVolunteerRegistered,
  numberVolunteer,
} }: Props) => {
  const theme = useTheme()

  return (
    <Link href={`/campaigns/${campaignId}`}>
      <Card sx={{ borderRadius: 1, display: 'flex' }}>
        <CardMedia
          component='img'
          image={(link_image && JSON.parse(link_image)[0]) || '/examples/post-media-2.webp'}
          sx={{ width: 150 }}
        />

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
              border={`1px solid ${campaignStatusColor[status].color}`}
              sx={{ backgroundColor: campaignStatusColor[status].background }}
            >
              <Typography fontSize='0.5rem' color={campaignStatusColor[status].color}>
                {campaignStatusTitle[status]}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='caption' fontWeight={300}>
                Tổng số tiền: <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                  {numberWithDots(donationBudgetReceived || 0)}/{numberWithDots(donationBudget)} đồng
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

export default JoinedCardOrganization