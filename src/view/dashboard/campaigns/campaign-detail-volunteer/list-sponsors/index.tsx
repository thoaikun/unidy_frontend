import Sponsor from "@/component/sponsor"
import SponsorLoading from "@/component/sponsor/loading"
import api from "@/service/api"
import { TransactionType } from "@/type/campaign"
import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  campaignId: string
}

const ListSponsors = ({ campaignId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<TransactionType[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/campaign/${campaignId}/transactions`, {
          params: {
            pageNumber: 0,
            pageSize: 5,
          }
        })

        setData(response.data)
        setIsLoading(false)
      }
      catch (error: any) {
        toast.error(error.data.error)
      }
    })()
  }, [campaignId])

  return (
    <Grid container>
      <Grid item xs={12}>
        {(() => {
          if (isLoading) {
            return (
              <SponsorLoading />
            )
          }
          else if (data.length !== 0) {
            return (
              data.map((sponsor) => (
                <Sponsor data={sponsor} key={sponsor.transactionId} />
              ))
            )
          }
          else {
            return <Typography>Chưa có đóng góp từ bất kỳ nhà hảo tâm nào.</Typography>
          }
        })()}
      </Grid>
    </Grid>
  )
}

export default ListSponsors