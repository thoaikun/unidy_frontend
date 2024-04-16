'use client'

import Campaign from "@/component/campaign"
import UserCardLoading from "@/component/user-card/loading"
import api from "@/service/api"
import { CampaignType } from "@/type/campaign"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  searchTerm: string
}

const SearchCampaignsResult = ({ searchTerm }: Props) => {
  const [data, setData] = useState<CampaignType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/search/campaign', {
          params: {
            searchTerm,
            limit: 5,
            skip: 0,
          }
        })

        setData(response.data.hits)
        setIsLoading(false)
      }
      catch (error: any) {
        toast.error(error?.data?.error)
      }
    })()
  }, [searchTerm])

  if (isLoading) {
    return <UserCardLoading />
  }
  else {
    return (
      <Grid container spacing={2.5}>
        {data.map((campaign) => (
          <Grid item xs={12} key={campaign.campaign.campaignId}>
            <Campaign data={campaign} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default SearchCampaignsResult