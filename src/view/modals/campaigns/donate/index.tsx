import { closeDonateModal } from "@/lib/features/modals/modalsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { Close } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material"
import Image from "next/image"
import { useCallback } from "react"

const DonateModal = () => {
  const { campaignId } = useAppSelector((state) => state.modals.donateModal)
  const dispatch = useAppDispatch()

  const handleClose = useCallback(() => {
    dispatch(closeDonateModal())
  }, [dispatch])

  return (
    <Dialog open={true} fullWidth>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogActions>

      <DialogTitle>
        <Typography variant="h4" fontWeight={500}>Ủng hộ cho chiến dịch</Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6' fontWeight={400}>Chọn mức tiền ủng hộ</Typography>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            {[50000, 100000, 200000, 500000].map((item) => (
              <Grid item key={item}>
                <Button variant='outlined' color="inherit">
                  <Typography variant="h4" fontWeight={500}>{item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Typography>hoặc</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth variant="standard" type="number" placeholder="Nhập số tiền muốn ủng hộ" />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6' fontWeight={400}>Phương thức thanh toán</Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant='outlined'
              color='momo'
              startIcon={<Image src='/images/dashboard/modal/momo.svg' alt='momo' width={27} height={27} />}
            >
              <Typography variant="h4" fontWeight={500}>Momo</Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button fullWidth variant='contained'>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DonateModal