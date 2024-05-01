'use client'

import { Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import Image from "next/image"
import { useCallback } from "react"
import SponsorV2 from "../sponsor-v2"
import useApi from "@/hooks/use-api"
import { TransactionType } from "@/type/campaign"
import SponsorV2Loading from "../sponsor-v2/loading"

const sortType = {
  newest: 'newest',
  top: 'top',
}

const ListSponsors = () => {
  const { data, isLoading, params, setParams } = useApi<TransactionType>('/organization/transactions', {
    params: {
      pageNumber: 0,
      pageSize: 5,
      sort: sortType.newest,
    }
  })

  const handleChangeMode = useCallback((newMode: string) => () => {
    setParams({ ...params, sort: newMode })
  }, [setParams, params])

  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        title='Nhà hảo tâm'
        action={
          <>
            <Button
              startIcon={
                <Image
                  src={`/images/dashboard/home/list-sponsor/recent${params.sort === sortType.newest ? '-selected' : ''}.svg`}
                  alt='recent-icon'
                  width={15}
                  height={15}
                />
              }
              onClick={handleChangeMode(sortType.newest)}
              disabled={isLoading}
            >
              <Typography>Gần nhất</Typography>
            </Button>

            <Button
              startIcon={
                <Image
                  src={`/images/dashboard/home/list-sponsor/top${params.sort === sortType.top ? '-selected' : ''}.svg`}
                  alt='top-icon'
                  width={15}
                  height={15}
                />
              }
              onClick={handleChangeMode(sortType.top)}
              disabled={isLoading}
            >
              <Typography>Top</Typography>
            </Button>
          </>
        }
      />

      <CardContent>
        <Grid container spacing={2}>
          {(() => {
            if (isLoading) {
              return (
                <Grid item xs={12}>
                  <SponsorV2Loading />
                </Grid>
              )
            }
            else if (data.length > 0) {
              return (
                data.map((sponsor) => (
                  <Grid item xs={12} key={sponsor.user.userId}>
                    <SponsorV2 data={sponsor} />
                  </Grid>
                ))
              )
            }
            else {
              return <Typography>Chưa có nhà hảo tâm nào ủng hộ cho tổ chức.</Typography>
            }
          })()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ListSponsors