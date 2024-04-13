import { closePostDetail } from "@/lib/features/modals/post-detail-modal/postDetailModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { PostType } from "@/type/post"
import { Close } from "@mui/icons-material"
import { Dialog, Grid, IconButton, Skeleton } from "@mui/material"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import PostInteraction from "./post-interaction"

const PostDetail = () => {
  const [data, setData] = useState<PostType>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { open, postId } = useAppSelector((state) => state.postDetailModal)
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      if (postId) {
        try {
          const response = await api.get(`/posts/${postId}`)

          setData(response.data[0])
          setIsLoading(false)
        }
        catch (error: any) {
          toast.error(error?.data?.error)
        }
      }
    })()
  }, [postId])

  const handleClose = useCallback(() => {
    dispatch(closePostDetail())
  }, [dispatch])

  return (
    <Dialog open={open} maxWidth='lg' fullWidth>
      <IconButton sx={{ position: 'absolute', top: 20, right: 20, zIndex: 1 }} onClick={handleClose}>
        <Close sx={{ color: '#000000' }} />
      </IconButton>
      {(() => {
        if (isLoading) {
          return (
            <Grid container spacing={2}>
              <Grid item xs='auto'>
                <Skeleton variant='rounded' width={700} height={700} animation='wave' />
              </Grid>
              <Grid item xs>
                <Skeleton variant='rounded' width='100%' height={700} animation='wave' />
              </Grid>
            </Grid>
          )
        }
        else if (data) {
          return (
            <Grid container spacing={2} overflow='hidden'>
              <Grid item xs='auto' height={716}>
                <Image
                  src={JSON.parse(data.linkImage)[0]}
                  alt='post-detail-image'
                  width={700}
                  height={700}
                  style={{ objectFit: 'cover' }}
                />
              </Grid>

              <Grid item xs height={716}>
                <PostInteraction data={data} setData={setData} />
              </Grid>
            </Grid>
          )
        }
        else {
          return <></>
        }
      })()}
    </Dialog>
  )
}

export default PostDetail