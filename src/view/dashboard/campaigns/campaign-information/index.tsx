'use client'

import CustomCircularProgress from "@/component/circular-progress"
import CustomCircularProgressLoading from "@/component/circular-progress/loading"
import { theme } from "@/component/theme"
import api from "@/service/api"
import { CampaignType, campaignStatusColor, campaignStatusTitle } from "@/type/campaign"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Card, Chip, Dialog, DialogContent, DialogTitle, Grid, Skeleton, TextField, Typography } from "@mui/material"
import Image from "next/image"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { object, string } from "yup"

interface formData {
  title: string
}

const defaultValues: formData = {
  title: '',
}

const schema = object({
  title: string().required('Tên sự kiện không được bỏ trống.'),
})

interface Props {
  campaignId: string
  isVolunteer: boolean
}

const CampaignInformation = ({ campaignId, isVolunteer }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<CampaignType>()
  const [open, setOpen] = useState<boolean>(false)

  const { control, handleSubmit, formState: { errors }, resetField, clearErrors, setError } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

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

  const handleOpenEndCampaignModal = useCallback(() => {
    setOpen(true)
  }, [])

  const handleCloseEndCampaignModal = useCallback(() => {
    resetField('title')
    setOpen(false)
  }, [resetField])

  const handleChange = useCallback((onChange: (...event: any[]) => void) => (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
    const timeoutId = setTimeout(() => {
      if (event.target.value !== data?.campaign.title) {
        setError('title', {
          message: 'Tên sự kiện chưa trùng khớp.',
          type: 'onChange'
        })
      }
      else {
        clearErrors()
      }
      clearTimeout(timeoutId)
    }, 0)
  }, [data, setError, clearErrors])

  const handleEndCampaign = useCallback(async () => {
    try {
      await api.patch(`/api/v1/organization/campaigns/${campaignId}/end`)
      handleCloseEndCampaignModal()
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [campaignId, handleCloseEndCampaignModal])

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
            <Image src={data.campaign.linkImage || '/examples/campaign-detail-media.jpeg'} alt='media' fill style={{ objectFit: 'cover' }} />
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
                  <Typography variant='h4'>{data.campaign.title}</Typography>
                </Grid>

                <Grid item xs='auto'>
                  <Chip
                    label={campaignStatusTitle[data.campaign.status]}
                    sx={{
                      backgroundColor: campaignStatusColor[data.campaign.status].background,
                      color: campaignStatusColor[data.campaign.status].color,
                      border: `1px solid ${campaignStatusColor[data.campaign.status].color}`,
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
                    {new Date(data.campaign.startDate).toLocaleDateString()} - {new Date(data.campaign.endDate).toLocaleDateString()}
                  </span>
                </Typography>
                <Typography>Địa điểm: <span style={{ fontWeight: 300 }}>{data.campaign.location}</span></Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography fontWeight={300}>{data.campaign.content}</Typography>
                {data.campaign.hashTag && (
                  <Typography color={theme.palette.primary.main}>
                    {data.campaign.hashTag}
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
                      value={data.campaign.donationBudgetReceived / data.campaign.donationBudget * 100}
                      title={`${(data.campaign.donationBudgetReceived / data.campaign.donationBudget * 100).toFixed(1)}%`}
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
                      value={data.campaign.numOfRegister / data.campaign.numbersVolunteer * 100}
                      title={`${data.campaign.numOfRegister}/${data.campaign.numbersVolunteer}`}
                    />
                  </Grid>

                  <Grid item xs={12} container justifyContent='center'>
                    <Typography variant='h6'>Số người tham gia</Typography>
                  </Grid>
                </Grid>
              </Grid>

              {!isVolunteer && (
                <>
                  <Grid item container justifyContent='space-between' mt={1} spacing={2}>
                    <Grid item xs>
                      <Button size='large' variant='outlined' fullWidth>
                        <Typography color='primary'>Cập nhật sự kiện</Typography>
                      </Button>
                    </Grid>
                    <Grid item xs>
                      <Button
                        size='large'
                        variant='contained'
                        fullWidth
                        disableElevation
                        onClick={handleOpenEndCampaignModal}
                      >
                        <Typography color='#ffffff'>Kết thúc chiến dịch</Typography>
                      </Button>
                    </Grid>
                  </Grid>

                  <Dialog open={open} maxWidth='xs'>
                    <DialogTitle>
                      <Typography variant='h4'>Kết thúc sự kiện?</Typography>
                    </DialogTitle>

                    <DialogContent>
                      <Typography variant='h6' fontWeight={300}>
                        Bạn có chắc chắn muốn kết thúc chiến dịch.
                        Thông tin chiến dịch và bằng khen sẽ được gửi tới những người tham gia.
                        Vui lòng nhập tên sự kiện <span style={{ fontWeight: 500 }}>{data.campaign.title}</span> để xác nhận.
                      </Typography>
                    </DialogContent>

                    <DialogContent>
                      <Controller
                        control={control}
                        name='title'
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            fullWidth
                            size='small'
                            placeholder='Nhập tên sự kiện'
                            value={value}
                            onChange={handleChange(onChange)}
                            error={Boolean(errors.title)}
                          />
                        )}
                      />
                    </DialogContent>

                    <DialogContent>
                      <Grid container spacing={2}>
                        <Grid item xs>
                          <Button
                            fullWidth
                            variant='outlined'
                            sx={{ borderColor: theme.palette.error[300], height: 45 }}
                            color='error'
                            onClick={handleCloseEndCampaignModal}
                          >
                            <Typography color={theme.palette.error[300]}>Hủy</Typography>
                          </Button>
                        </Grid>

                        <Grid item xs>
                          <Button
                            fullWidth
                            variant='contained'
                            sx={{ height: 45 }}
                            onClick={handleSubmit(handleEndCampaign)}
                          >
                            <Typography color='#ffffff'>Đồng ý</Typography>
                          </Button>
                        </Grid>
                      </Grid>
                    </DialogContent>
                  </Dialog>
                </>
              )}
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