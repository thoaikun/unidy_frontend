import TransactionCard from "@/component/transaction-card"
import TransactionCardLoading from "@/component/transaction-card/loading"
import api from "@/service/api"
import { TransactionType } from "@/type/campaign"
import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const TransactionHistory = () => {
  const [isLoadingTransactionHistory, setIsLoadingTransactionHistory] = useState<boolean>(true)
  const [transactionHistory, setTransactionHistory] = useState<TransactionType[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/users/transactions', {
          params: {
            pageNumber: 0,
            pageSize: 6,
          }
        })

        setTransactionHistory(response.data)
        setIsLoadingTransactionHistory(false)
      }
      catch (error: any) {
        toast.error(error.data.error)
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
          if (isLoadingTransactionHistory) {
            return (
              <Grid item xs={6}>
                <TransactionCardLoading />
              </Grid>
            )
          }
          else if (transactionHistory.length !== 0) {
            return (
              transactionHistory.map((item) => (
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