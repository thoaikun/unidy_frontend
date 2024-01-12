'use client'

import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Grid, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography, useTheme } from "@mui/material"
import Image from "next/image"
import { useState } from "react"

const spentAmount = [
  {
    category: 'Xi măng',
    quantity: '20kg',
    cost: '120 triệu',
    status: 'Đã giải ngân',
  },
  {
    category: 'Gạnh ốp',
    quantity: '300 viên',
    cost: '10 triệu',
    status: 'Đã giải ngân',
  },
  {
    category: 'Vở',
    quantity: '100 quyển',
    cost: '33 triệu',
    status: 'Đã giải ngân',
  },
  {
    category: 'Học bổng',
    quantity: '30 phần',
    cost: '50 triệu',
    status: 'Đã giải ngân',
  },
]

const sponsorList = [
  {
    avatar: '/examples/avatar-7.svg',
    name: 'Thoại Lê Nè',
  },
  {
    avatar: '/examples/avatar-7.svg',
    name: 'Trương Văn Vở',
  },
  {
    avatar: '/examples/avatar-2.svg',
    name: 'Phương Anh Nguyễn',
  },
  {
    avatar: '/examples/avatar-7.svg',
    name: 'Phương Anh Nguyễn',
  },
  {
    avatar: '/examples/avatar-7.svg',
    name: 'Phương Anh Nguyễn',
  },
]

const CampaignDetail = ({ params }: { params: { id: string } }) => {
  const theme = useTheme()
  const [tabIndex, setTabIndex] = useState<number>(0)

  return (
    <Grid container spacing={6.5} pt={4.375}>
      <Grid item container spacing={1.875} width={484} justifyContent='center'>
        <Grid item>
          <Image src='/examples/campaign-detail-media.png' alt='media' width={484} height={300} />
        </Grid>

        <Grid item>
          <Image src='/examples/campaign-detail-slider.svg' alt='media' width={70} height={10} />
        </Grid>

        <Grid item>
          <Card sx={{ width: 484, px: 3, py: 4.5 }}>
            <Grid container spacing={1.75}>
              <Grid item container justifyContent='space-between'>
                <Typography variant='h4'>Ủng hộ bảo tồn thú hoang dã</Typography>
                <Chip
                  label='ĐÃ KẾT THÚC'
                  sx={{
                    backgroundColor: theme.palette.success[100],
                    color: theme.palette.success[600],
                    border: `1px solid ${theme.palette.success[600]}`,
                    borderRadius: 1,
                    fontSize: 10,
                    height: 21,
                  }}
                />
              </Grid>

              <Grid item>
                <Typography>Thời gian diễn ra: <span style={{ fontWeight: 300 }}>20/4/2023 - 30/9/2023</span></Typography>
                <Typography>Địa điểm: <span style={{ fontWeight: 300 }}>Sở thú thành phố Hồ Chí Minh</span></Typography>
              </Grid>

              <Grid item>
                <Typography fontWeight={300}>
                  Mỗi ngày đều có những điều mới để khám phá, cùng chúng tôi giúp đỡ những loài động vật nhỏ pé này ngay
                </Typography>
                <Typography color={theme.palette.primary.main}>
                  #dieforone #Volunteee
                </Typography>
              </Grid>

              <Grid item container justifyContent='space-around' mt={3.75}>
                <Grid item>
                  <Image src='/examples/campaign-detail-money.svg' alt='media' width={125} height={125} />
                  <Typography variant='h6'>Số tiền đã ủng hộ</Typography>
                </Grid>
                <Grid item>
                  <Image src='/examples/campaign-detail-volunteer.svg' alt='media' width={125} height={125} />
                  <Typography variant='h6'>Số người tham gia</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs>
        <Card sx={{ px: 5, py: 3 }}>
          <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)}>
            <Tab label='Chứng nhận' />
            <Tab label='Báo cáo chiến dịch' />
          </Tabs>

          {tabIndex === 0 &&
            <>
              <Grid container justifyContent='center'>
                <Image src='/examples/campaign-detail-certificate.png' alt='media' width={666} height={470} />
              </Grid>
              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined' color='secondary' sx={{ width: 161, height: 46 }}>
                  <Typography variant='h6' fontWeight={400} color={theme.palette.text.primary}>
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
              <Typography>Thông số</Typography>
              <Image src='/examples/campaign-detail-chart.svg' alt='media' width={700} height={292} />

              <Typography>Các khoản đã chi</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Hạng mục</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Thành tiền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {spentAmount.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.cost}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

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
      </Grid>
    </Grid>
  )
}

export default CampaignDetail