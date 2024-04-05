'use client'

import { useAppSelector } from "@/lib/hook"
import CampaignDetailOrganization from "@/view/campaign/campaign-detail-organization"
import CampaignDetailVolunteer from "@/view/campaign/campaign-detail-volunteer"
import CampaignInformation from "@/view/dashboard/campaigns/campaign-information"
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

interface Props {
  params: {
    campaignId: string
  }
}

const CampaignDetail = ({ params: { campaignId } }: Props) => {
  const user = useAppSelector(state => state.auth.user)
  const isOrganization = user?.role === 'ORGANIZATION'
  const [open, setOpen] = useState<boolean>(false)
  const theme = useTheme()

  const handleOpenEndCampaign = useCallback(() => {
    setOpen(true)
  }, [])

  const handleCloseEndCampaign = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Grid container spacing={6.5}>
      <Grid item width={536}>
        <CampaignInformation campaignId={campaignId} />
      </Grid>

      {/* <Dialog open={open} maxWidth='xs'>
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
                <Typography color='#ffffff'>Đồng ý</Typography>
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog> */}

      <Grid item xs>
        {isOrganization ? <CampaignDetailOrganization /> : <CampaignDetailVolunteer campaignId={campaignId} />}
      </Grid>
    </Grid>
  )
}

export default CampaignDetail