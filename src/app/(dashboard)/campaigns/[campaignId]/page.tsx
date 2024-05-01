import CampaignDetailOrganization from "@/view/dashboard/campaigns/campaign-detail-organization"
import CampaignDetailVolunteer from "@/view/dashboard/campaigns/campaign-detail-volunteer"
import CampaignInformation from "@/view/dashboard/campaigns/campaign-information"
import { Grid } from "@mui/material"
import { cookies } from "next/headers"

interface Props {
  params: {
    campaignId: string
  }
}

const CampaignDetail = ({ params: { campaignId } }: Props) => {
  const cookieStore = cookies()
  const isVolunteer = cookieStore.get('role')?.value !== 'ORGANIZATION'
  // const [open, setOpen] = useState<boolean>(false)

  // const handleOpenEndCampaign = useCallback(() => {
  //   setOpen(true)
  // }, [])

  // const handleCloseEndCampaign = useCallback(() => {
  //   setOpen(false)
  // }, [])

  return (
    <Grid container spacing={6.5}>
      <Grid item width={536}>
        <CampaignInformation campaignId={campaignId} isVolunteer={isVolunteer} />
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
        {isVolunteer ? (
          <CampaignDetailVolunteer campaignId={campaignId} />
        ) : (
          <CampaignDetailOrganization campaignId={campaignId} />
        )}
      </Grid>
    </Grid>
  )
}

export default CampaignDetail