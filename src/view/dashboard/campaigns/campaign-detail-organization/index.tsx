import CustomTable from "@/component/table"
import { joinRequest, spentAmount } from "@/fakeData/campaigns"
import { Avatar, Button, Card, Checkbox, Divider, Grid, IconButton, Tab, Tabs, Typography, useTheme } from "@mui/material"
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

const CampaignDetailOrganization = () => {
  const theme = useTheme()
  const [tabIndex, setTabIndex] = useState<number>(0)

  return (
    <Card sx={{ px: 5, py: 3, height: 1 }}>
      <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)}>
        {['Yêu cầu tham gia', 'Người tham gia', 'Người ủng hộ', 'Các khoảng chi'].map((item, index) => (
          <Tab key={index} label={item} sx={{ textTransform: 'none' }} />
        ))}
      </Tabs>

      {tabIndex === 0 && (
        <Grid container mt={2}>
          <Grid item container justifyContent='flex-end'>
            <Button variant='outlined' sx={{ mr: 2 }} color='inherit'>Xóa</Button>
            <Button variant='outlined'>Phê duyệt</Button>
          </Grid>
          {new Array(3).fill(joinRequest).map((item, index) => (
            <Grid item container p={2} alignItems='center' spacing={2} key={index}>
              <Grid item>
                <Checkbox />
              </Grid>
              <Grid item>
                <Avatar src={item.image} sx={{ width: 64, height: 64 }} />
              </Grid>
              <Grid item xs>
                <Typography variant='h6'>{item.fullName}</Typography>
                <Typography fontWeight={300}>Tuổi: {item.age}</Typography>
                <Typography fontWeight={300}>Nghề nghiệp: {item.job}</Typography>
                <Typography fontWeight={300}>Nơi công tác: {item.workLocation}</Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2' fontWeight={300}>• 10m</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>))}
        </Grid>
      )}

      {tabIndex === 1 && (
        <Grid container mt={2}>
          {new Array(5).fill(joinRequest).map((item, index) => (
            <Grid item container p={2} alignItems='center' spacing={2} key={index}>
              <Grid item>
                <Avatar src={item.image} sx={{ width: 64, height: 64 }} />
              </Grid>
              <Grid item xs>
                <Typography variant='h6'>{item.fullName} <span style={{ fontSize: '0.75rem', color: '#d1d4d7', fontWeight: 300 }}>• 10m</span></Typography>
                <Typography fontWeight={300}>Tuổi: {item.age}</Typography>
                <Typography fontWeight={300}>Nghề nghiệp: {item.job}</Typography>
                <Typography fontWeight={300}>Nơi công tác: {item.workLocation}</Typography>
              </Grid>
              <Grid item>
                <IconButton>
                  <Image src='/icons/more-three-dot.svg' alt='setting' width={15} height={15} />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>))}
        </Grid>
      )}

      {tabIndex === 2 && (
        <Grid container mt={2}>
          {new Array(5).fill(joinRequest).map((item, index) => (
            <Grid item container p={2} alignItems='center' spacing={2} key={index}>
              <Grid item>
                <Avatar src={item.image} sx={{ width: 64, height: 64 }} />
              </Grid>
              <Grid item xs>
                <Typography variant='h6'>{item.fullName} <span style={{ fontSize: '0.75rem', color: '#d1d4d7', fontWeight: 300 }}>• 10m</span></Typography>
                <Typography fontWeight={300}>Nhà hảo tâm vàng</Typography>
                <Typography fontWeight={300}>Số tiền ủng hộ: <span style={{ color: theme.palette.primary.main }}>10 triệu đồng</span></Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>))}
        </Grid>
      )}

      {tabIndex === 3 && <CustomTable header={headerSpentAmount} data={spentAmount} sx={{ mt: 2 }} />}
    </Card>
  )
}

export default CampaignDetailOrganization