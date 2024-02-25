'use client'

import { useAppSelector } from "@/lib/hook"
import CampaignDetailOrganization from "@/view/campaign/campaign-detail-organization"
import CampaignDetailVolunteer from "@/view/campaign/campaign-detail-volunteer"
import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, Typography, useTheme } from "@mui/material"
import Image from "next/image"
import { useCallback, useState } from "react"

// const sponsorList = [
//   {
//     avatar: '/examples/avatar-7.svg',
//     name: 'Thoại Lê Nè',
//   },
//   {
//     avatar: '/examples/avatar-7.svg',
//     name: 'Trương Văn Vở',
//   },
//   {
//     avatar: '/examples/avatar-2.svg',
//     name: 'Phương Anh Nguyễn',
//   },
//   {
//     avatar: '/examples/avatar-7.svg',
//     name: 'Phương Anh Nguyễn',
//   },
//   {
//     avatar: '/examples/avatar-7.svg',
//     name: 'Phương Anh Nguyễn',
//   },
// ]

const CampaignDetail = ({ params }: { params: { id: string } }) => {
  const user = useAppSelector(state => state.auth.user)
  const isOrganization = user?.role === 'organization'
  const [open, setOpen] = useState<boolean>(false)
  const theme = useTheme()

  const handleOpenEndCampaign = useCallback(() => {
    setOpen(true)
  }, [])

  const handleCloseEndCampaign = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Grid container spacing={6.5} pt={4.375}>
      <Grid item container spacing={1.875} width={484} justifyContent='center'>
        <Grid item>
          <Image src='/examples/campaign-detail-media.jpeg' alt='media' width={484} height={300} />
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

              {isOrganization && <Grid item container justifyContent='space-between' mt={4} spacing={2}>
                <Grid item xs>
                  <Button size='large' variant='outlined' fullWidth>
                    <Typography color='primary'>Cập nhật sự kiện</Typography>
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button size='large' variant='contained' fullWidth disableElevation onClick={handleOpenEndCampaign}>
                    <Typography color='#FFFFFF'>Kết thúc chiến dịch</Typography>
                  </Button>
                </Grid>
              </Grid>}
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={open} maxWidth='xs'>
        <DialogTitle>
          <Typography variant='h4'>Kết thúc sự kiện?</Typography>
        </DialogTitle>

        <DialogContent>
          <Typography variant='h6' fontWeight={300}>
            Bạn có chắc chắn muốn kết thúc chiến dịch. Thông tin chiến dịch và bằng khen sẽ được gửi tới những người tham gia. Vui lòng nhập tên sự kiện <span style={{ fontWeight: 500 }}>HiHi</span> để xác nhận.
          </Typography>
        </DialogContent>
        <DialogContent>
          <TextField fullWidth size='small' placeholder='Nhập tên sự kiện' />
        </DialogContent>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs>
              <Button
                fullWidth
                variant='outlined'
                sx={{ borderColor: theme.palette.error[300], height: 45 }}
                color='error'
                onClick={handleCloseEndCampaign}
              >
                <Typography color={theme.palette.error[300]}>Hủy</Typography>
              </Button>
            </Grid>
            <Grid item xs>
              <Button fullWidth variant='contained' sx={{ height: 45 }} onClick={handleCloseEndCampaign}>
                <Typography color='#FFFFFF'>Đồng ý</Typography>
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Grid item xs>
        {isOrganization ? <CampaignDetailOrganization /> : <CampaignDetailVolunteer />}
      </Grid>
    </Grid>
  )
}

export default CampaignDetail