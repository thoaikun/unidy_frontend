'use client'

import { TransactionType, campaignStatusColor, campaignStatusTitle } from '@/type/campaign'
import { numberWithDots } from '@/utils/number-with-dots'
import { Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material'
import Link from 'next/link'

interface Props {
  data: TransactionType
}

const transactionTypeTitle: { [key: string]: string } = {
  momo_wallet: 'Momo'
}

const TransactionCard = ({ data: {
  transactionType,
  transactionAmount,
  transactionTime,
  campaignId,
  campaign: {
    link_image,
    title,
    status,
  },
} }: Props) => {
  const theme = useTheme()

  return (
    // <Link href={`/campaign/${campaignId}`}>
    <Card sx={{ boxShadow: 'none', borderRadius: 1, display: 'flex' }}>
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
            <Typography
              fontSize='0.5rem'
              color={(theme) => theme.palette[campaignStatusColor[status].color][campaignStatusColor[status].main]}
            >
              {campaignStatusTitle[status]}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' fontWeight={300}>
              Số tiền ủng hộ: <span style={{ color: theme.palette.error[300], fontWeight: 400 }}>
                {numberWithDots(transactionAmount)}
              </span>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' fontWeight={300}>
              Thời gian: <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                {transactionTime ? new Date(transactionTime).toLocaleDateString() : 'Không có thông tin'}
              </span>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' fontWeight={300}>
              Phương thức: <span style={{ color: theme.palette.text.primary, fontWeight: 400 }}>
                {transactionTypeTitle[transactionType]}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    // </Link>
  )
}

export default TransactionCard