import UploadImage from "@/component/upload-image"
import { closeNewPost } from "@/lib/features/modals/new-post-modal/newPostModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { yupResolver } from "@hookform/resolvers/yup"
import { Close } from "@mui/icons-material"
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material"
import Image from "next/image"
import { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { array, mixed, object, string } from "yup"

interface formData {
  content: string
  status: string
  listImageFile: File[]
}

const defaultValues: formData = {
  content: '',
  status: '',
  listImageFile: []
}

const schema = object({
  content: string().default(''),
  status: string().default(''),
  listImageFile: array().of(mixed<File>().required()).required(),
})


const NewPost = () => {
  const { open } = useAppSelector((state) => state.newPostModal)
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.auth.user)

  const { control, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleClose = useCallback(() => {
    dispatch(closeNewPost())
  }, [dispatch])

  const onSubmit = useCallback(async (data: formData) => {
    try {
      const formData = new FormData()
      formData.append('content', data.content)
      formData.append('status', data.status)
      data.listImageFile.forEach((file) => {
        formData.append('listImageFile[]', file)
      })

      await api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Bài viết đã được đăng thành công')
      handleClose()
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [handleClose])

  return (
    <Dialog open={open} maxWidth='md' fullWidth PaperProps={{ sx: { height: 600 } }}>
      <Grid container spacing={2}>
        <Grid item width={480} container>
          <DialogContent>
            <Grid item xs={12}>
              <Typography variant='h5' fontWeight={400} my={2}>Tải hình ảnh</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name='listImageFile'
                render={({ field: { onChange, value } }) => (
                  <Grid container spacing={2}>
                    {value.map((file, index) => (
                      <Grid item xs={6} position='relative' key={index}>
                        <Image
                          src={URL.createObjectURL(file)}
                          alt='image'
                          width={200}
                          height={200}
                          style={{ objectFit: 'contain', backgroundColor: '#FAFAFA' }}
                        />
                        <IconButton
                          sx={{ position: 'absolute', right: 0 }}
                          onClick={() => onChange(value.filter((_, idx) => idx !== index))}
                        >
                          <Close />
                        </IconButton>
                      </Grid>
                    ))}

                    <Grid item xs={6}>
                      <UploadImage
                        onUploadImage={(file) => {
                          onChange([...value, file])
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>
          </DialogContent>
        </Grid>

        <Grid item xs>
          <DialogTitle mt={2}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs='auto'>
                <Avatar src={user?.image} />
              </Grid>

              <Grid item xs>
                <Typography fontWeight={500}>{user?.fullName}</Typography>
              </Grid>

              <Grid item xs='auto'>
                <IconButton onClick={handleClose}>
                  <Close sx={{ color: '#000000' }} />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>

          <DialogContent>
            <Controller
              control={control}
              name='content'
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant='standard'
                  value={value}
                  onChange={onChange}
                  multiline
                  placeholder='Nêu cảm nghĩ của bạn'
                />
              )}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3 }}>
            <Button fullWidth variant='contained' onClick={handleSubmit(onSubmit)}>
              Đăng bài
            </Button>
          </DialogActions>
        </Grid>
      </Grid >
    </Dialog >
  )
}

export default NewPost