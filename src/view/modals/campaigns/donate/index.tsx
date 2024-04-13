import { closeBackdrop, openBackdrop } from "@/lib/features/modals/backdrop/backdropSlice"
import { closeDonateModal } from "@/lib/features/modals/donate-modal/donateModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { numberWithDots } from "@/utils/number-with-dots"
import { yupResolver } from "@hookform/resolvers/yup"
import { Close } from "@mui/icons-material"
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormHelperText, Grid, IconButton, TextField, Typography } from "@mui/material"
import Image from "next/image"
import { ChangeEvent, useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { boolean, object, string } from "yup"

interface formData {
  donateAmount: string
  agreed: boolean
}

const defaultValues: formData = {
  donateAmount: '',
  agreed: false,
}

const schema = object({
  donateAmount: string().min(5, 'Số tiền ủng hộ tối thiểu là 1.000').max(13, 'Số tiền ủng hộ tối đa là 9.999.999.999'),
  agreed: boolean().required().isTrue('Bạn phải đồng ý với các điều khoản của Unidy'),
})

const DonateModal = () => {
  const { campaignId, organizationUserId } = useAppSelector((state) => state.donateModal)
  const dispatch = useAppDispatch()

  const { control, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema as any),
  })

  const handleClose = useCallback(() => {
    dispatch(closeDonateModal())
  }, [dispatch])

  const handleSelectDonateAmount = useCallback((amount: string, onChange: (...event: any[]) => void) => () => {
    onChange(amount)
  }, [])

  const handleChangeDonateAmount = useCallback(
    (onChange: (...event: any[]) => void) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = event.target.value
        if (value.length > 13) {
          setError('donateAmount', {
            message: 'Số tiền ủng hộ tối đa là 9.999.999.999',
            type: 'max'
          })
        } else {
          clearErrors('donateAmount')
          value = value.substring(0, 13)
          onChange(value ? numberWithDots(value) : '')
        }
      }, [setError, clearErrors])

  const onSubmit = useCallback(async (data: formData) => {
    try {
      dispatch(openBackdrop())
      const response = await api.post('/donation', {
        campaignId: parseInt(campaignId),
        organizationUserId,
        amounts: parseInt(data.donateAmount.replaceAll('.', ''))
      })

      const a = document.createElement('a')
      a.href = response.data.payUrl
      a.target = '_blank'
      a.click()

      dispatch(closeBackdrop())
      handleClose()
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [dispatch, campaignId, organizationUserId, handleClose])

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

          <Controller
            control={control}
            name='donateAmount'
            render={({ field: { onChange, value } }) => (
              <>
                <Grid item xs={12} container spacing={2}>
                  {['50.000', '100.000', '200.000', '500.000'].map((item) => (
                    <Grid item key={item}>
                      <Button
                        variant='outlined'
                        color={item === value ? 'primary' : 'inherit'}
                        onClick={handleSelectDonateAmount(item, onChange)}
                      >
                        <Typography variant="h4" fontWeight={500}>{item}</Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                <Grid item xs={12}>
                  <Typography color={(theme) => theme.palette.text.secondary}>hoặc</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={value}
                    onChange={handleChangeDonateAmount(onChange)}
                    variant="standard"
                    placeholder="Nhập số tiền muốn ủng hộ"
                    inputProps={{ style: { fontSize: '1rem' } }}
                    error={Boolean(errors.donateAmount)}
                    helperText={errors.donateAmount?.message}
                  />
                </Grid>
              </>
            )}
          />

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

          <Grid item xs={12}>
            <Controller
              control={control}
              name='agreed'
              render={({ field: { onChange, value } }) => (
                <>
                  <FormControlLabel
                    control={<Checkbox color='primary' value={value} onChange={onChange} />}
                    label={<Typography variant='body2' color={(theme) => theme.palette.text.secondary}>Đồng ý với các điều khoản của Unidy</Typography>}
                  />
                  <FormHelperText>
                    <Typography variant='caption' color='error'>{errors.agreed?.message}</Typography>
                  </FormHelperText>
                </>
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button fullWidth variant='contained' onClick={handleSubmit(onSubmit)}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DonateModal