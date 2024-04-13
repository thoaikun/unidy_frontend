import api from "@/service/api"
import { CertificateType } from "@/type/campaign"
import { Button, Grid, Skeleton, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  campaignId: string
}

const CertificatePreview = ({ campaignId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<CertificateType>()
  console.log(isLoading, data)

  useEffect(() => {
    (async () => {
      if (campaignId) {
        try {
          const response = await api.get(`/campaign/${campaignId}/certificates`)

          setData(response.data[0])
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
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent='center'>
          <Skeleton variant="rounded" width={666} height={470} animation='wave' />
        </Grid>

        <Grid item xs={12} container spacing={2} justifyContent='flex-end'>
          <Grid item xs='auto'>
            <Skeleton variant='rounded' width={161} height={46} animation='wave' />
          </Grid>

          <Grid item xs='auto'>
            <Skeleton variant='rounded' width={142} height={46} animation='wave' />
          </Grid>
        </Grid>
      </Grid>
    )
  }
  else if (data) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent='center'>
          <object data={data.certificateLink} width={666} height={470} />
        </Grid>

        <Grid item xs={12} container spacing={2} justifyContent='flex-end'>
          <Grid item xs='auto'>
            <Link href={data.certificateLink} target='_blank'>
              <Button variant='outlined' color='secondary' sx={{ width: 161, height: 46 }}>
                <Typography variant='h6' fontWeight={400} color='primary'>
                  In chứng nhận
                </Typography>
              </Button>
            </Link>
          </Grid>

          <Grid item xs='auto'>
            <Button variant='contained' disableElevation sx={{ width: 142, height: 46 }}>
              <Typography variant='h6' fontWeight={400}>Quy đổi</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }
  else {
    return <Typography>Không tìm thấy thông tin giấy chứng nhận.</Typography>
  }
}

export default CertificatePreview