import CustomCircularProgress from "@/component/circular-progress"
import CustomCircularProgressLoading from "@/component/circular-progress/loading"
import { theme } from "@/component/theme"
import api from "@/service/api"
import { CampaignDetailType, campaignStatusColor, campaignStatusTitle } from "@/type/campaign"
import { Box, Card, Chip, Grid, Skeleton, Typography } from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  campaignId: string
}

const CampaignInformation = ({ campaignId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<CampaignDetailType>()

  useEffect(() => {
    (async () => {
      if (campaignId) {
        try {
          const response = await api.get(`/campaign/${campaignId}`)

          setData(response.data)
          setIsLoading(false)
        }
        catch (error: any) {
          toast.error(error?.data?.error)
        }
      }
    })()
  }, [campaignId])

  if (isLoading) {
    return (
      <Grid container spacing={1.875} >
        <Grid item xs={12}>
          <Skeleton variant='rounded' width='100%' height={300} animation='wave' />
        </Grid>

        <Grid item xs={12} container justifyContent='center'>
          <Image src='/examples/campaign-detail-slider.svg' alt='media' width={70} height={10} />
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ px: 3, py: 4.5 }}>
            <Grid container spacing={1.75}>
              <Grid item xs={12} container>
                <Grid item xs>
                  <Typography variant='h4'>
                    <Skeleton width='50%' animation='wave' />
                  </Typography>
                </Grid>

                <Grid item xs='auto'>
                  <Skeleton variant='rounded' width={81} height={21} animation='wave' />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  <Skeleton width='50%' animation='wave' />
                </Typography>

                <Typography>
                  <Skeleton width='50%' animation='wave' />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography fontWeight={300}>
                  <Skeleton width='50%' animation='wave' />
                </Typography>
              </Grid>

              <Grid item xs={12} container justifyContent='space-around' mt={3.75}>
                <Grid item xs={6} container justifyContent='center' spacing={2}>
                  <Grid item xs='auto'>
                    <CustomCircularProgressLoading size={125} thickness={6} />
                  </Grid>

                  <Grid item xs={12} container justifyContent='center'>
                    <Typography variant='h6' width={0.5}><Skeleton width='100%' animation='wave' /></Typography>
                  </Grid>
                </Grid>

                <Grid item xs={6} container justifyContent='center' spacing={2}>
                  <Grid item xs='auto'>
                    <CustomCircularProgressLoading size={125} thickness={6} />
                  </Grid>

                  <Grid item xs={12} container justifyContent='center'>
                    <Typography variant='h6' width={0.5}><Skeleton width='100%' animation='wave' /></Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    )
  }
  else if (data) {
    return (
      <Grid container spacing={1.875} >
        <Grid item xs={12}>
          <Box position='relative' height={300}>
            <Image src={data.linkImage || '/examples/campaign-detail-media.jpeg'} alt='media' fill style={{ objectFit: 'cover' }} />
          </Box>
        </Grid>

        <Grid item xs={12} container justifyContent='center'>
          <Image src='/examples/campaign-detail-slider.svg' alt='media' width={70} height={10} />
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ px: 3, py: 4.5 }}>
            <Grid container spacing={1.75}>
              <Grid item xs={12} container>
                <Grid item xs>
                  <Typography variant='h4'>{data.title}</Typography>
                </Grid>

                <Grid item xs='auto'>
                  <Chip
                    label={campaignStatusTitle[data.status]}
                    sx={{
                      backgroundColor: campaignStatusColor[data.status].background,
                      color: campaignStatusColor[data.status].color,
                      border: `1px solid ${campaignStatusColor[data.status].color}`,
                      borderRadius: 1,
                      fontSize: '0.625rem',
                      height: 21,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  Thời gian diễn ra: <span style={{ fontWeight: 300 }}>
                    {new Date(data.startDate).toLocaleDateString()} - {new Date(data.endDate).toLocaleDateString()}
                  </span>
                </Typography>
                <Typography>Địa điểm: <span style={{ fontWeight: 300 }}>{data.location}</span></Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography fontWeight={300}>{data.content}</Typography>
                {data.hashTag && (
                  <Typography color={theme.palette.primary.main}>
                    {data.hashTag.join(' ')}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} container justifyContent='space-around' mt={3.75}>
                <Grid item xs={6} container justifyContent='center' spacing={2}>
                  <Grid item xs='auto'>
                    <CustomCircularProgress
                      color='success'
                      size={125}
                      thickness={6}
                      value={data.donationBudgetReceived / data.donationBudget * 100}
                      title={`${(data.donationBudgetReceived / data.donationBudget * 100).toFixed(1)}%`}
                    />
                  </Grid>

                  <Grid item xs={12} container justifyContent='center'>
                    <Typography variant='h6'>Số tiền đã ủng hộ</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={6} container justifyContent='center' spacing={2}>
                  <Grid item xs='auto'>
                    <CustomCircularProgress
                      size={125}
                      thickness={6}
                      value={data.numOfRegister / data.numbersVolunteer * 100}
                      title={`${data.numOfRegister}/${data.numbersVolunteer}`}
                    />
                  </Grid>

                  <Grid item xs={12} container justifyContent='center'>
                    <Typography variant='h6'>Số người tham gia</Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/* {isOrganization && <Grid item container justifyContent='space-between' mt={4} spacing={2}>
                <Grid item xs>
                  <Button size='large' variant='outlined' fullWidth>
                    <Typography color='primary'>Cập nhật sự kiện</Typography>
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button size='large' variant='contained' fullWidth disableElevation onClick={handleOpenEndCampaign}>
                    <Typography color='#ffffff'>Kết thúc chiến dịch</Typography>
                  </Button>
                </Grid>
              </Grid>} */}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    )
  }
  else {
    return (
      <Typography>Không tìm thấy thông tin chiến dịch.</Typography>
    )
  }
}

export default CampaignInformation