import CustomTable from "@/component/table"
import { spentAmount } from "@/fakeData/campaigns"
import { Button, Card, CardActions, Grid, Tab, Tabs, Typography } from "@mui/material"
import Image from "next/image"
import { useState } from "react"

const headerSpentAmount = [
  {
    key: 'category',
    label: 'Hạng mục',
  },
  {
    key: 'quantity',
    label: 'Số lượng',
  },
  {
    key: 'cost',
    label: 'Thành tiền',
  },
  {
    key: 'status',
    label: 'Trạng thái',
  },
]

const CampaignDetailVolunteer = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  return (
    <Card sx={{ px: 5, py: 3 }}>
      <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)}>
        <Tab label='Chứng nhận' sx={{ textTransform: 'none' }} />
        <Tab label='Báo cáo chiến dịch' sx={{ textTransform: 'none' }} />
      </Tabs>

      {tabIndex === 0 &&
        <>
          <Grid container justifyContent='center'>
            <Image src='/examples/campaign-detail-certificate.png' alt='media' width={666} height={470} />
          </Grid>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='outlined' color='secondary' sx={{ width: 161, height: 46 }}>
              <Typography variant='h6' fontWeight={400} color='primary'>
                In chứng nhận
              </Typography>
            </Button>
            <Button variant='contained' disableElevation sx={{ width: 142, height: 46 }}>
              <Typography variant='h6' fontWeight={400}>Quy đổi</Typography>
            </Button>
          </CardActions>
        </>
      }

      {tabIndex === 1 &&
        <Grid container>
          <Grid item xs={12}>
            <Typography>Thông số</Typography>
            <Image src='/examples/campaign-detail-chart.svg' alt='media' width={700} height={292} />
          </Grid>

          <Grid item xs={12}>
            <Typography>Các khoản đã chi</Typography>
            <CustomTable header={headerSpentAmount} data={spentAmount} />
          </Grid>

          {/* <Typography>Các nhà hảo tâm đã đóng góp</Typography>
              {sponsorList.map((item, index) => (
                <Grid container spacing={1.875} px={2.5} py={1.875} borderBottom={`1px solid ${theme.palette.text.disabled}`}>
                  <Grid item>
                    <Avatar src={item.avatar} sx={{ width: 64, height: 64 }} />
                  </Grid>
                  <Grid item xs>
                    <Typography>{item.name}</Typography>
                    <Typography>Nhà hảo tâm vàng</Typography>
                    <Typography>Số tiền ủng hộ: 10 triệu đồng</Typography>
                  </Grid>
                </Grid>
              ))} */}
        </Grid>
      }
    </Card>
  )
}

export default CampaignDetailVolunteer