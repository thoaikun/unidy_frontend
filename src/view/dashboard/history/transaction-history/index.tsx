'use client'

import TransactionCard from "@/component/transaction-card"
import TransactionCardLoading from "@/component/transaction-card/loading"
import api from "@/service/api"
import { TransactionType } from "@/type/campaign"
import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const TransactionHistory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<TransactionType[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/users/transactions', {
          params: {
            pageNumber: 0,
            pageSize: 6,
          }
        })

        setData(response.data)
        setIsLoading(false)
      }
      catch (error: any) {
        toast.error(error?.data?.error)
      }
    })()
  }, [])

  return (
    <Grid container spacing={2.75}>
      <Grid item xs={12}>
        <Typography variant='h5'>Lịch sử ủng hộ</Typography>
      </Grid>

      <Grid item xs={12} container spacing={3.75}>
        {(() => {
          if (isLoading) {
            return (
              <Grid item xs={6}>
                <TransactionCardLoading />
              </Grid>
            )
          }
          else if (data.length !== 0) {
            return (
              data.map((item) => (
                <Grid item xs={6} key={item.transactionId}>
                  <TransactionCard data={item} />
                </Grid>
              ))
            )
          }
          else {
            return (
              <Grid item xs={12}>
                <Typography>Không có lịch sử ủng hộ.</Typography>
              </Grid>
            )
          }
        })()}
      </Grid>
    </Grid>
  )
}

export default TransactionHistory