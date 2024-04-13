import api from "@/service/api"
import { CommentType } from "@/type/comment"
import { Avatar, Card, Grid, IconButton, TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Comment from "../comment"
import { useAppSelector } from "@/lib/hook"
import { object, string } from "yup"
import {  useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

interface formData {
  content: string
}

const defaultValues: formData = {
  content: '',
}

const schema = object({
  content: string().required(),
})

interface Props {
  postId?: string
  campaignId?: string
}

const ListComments = ({ postId, campaignId }: Props) => {
  const user = useAppSelector((state) => state.auth.user)
  const [comments, setComments] = useState<CommentType[]>([])

  const { control, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    (async () => {
      try {
        if (postId) {
          const response = await api.get(`/posts/${postId}/comments`, {
            params: {
              skip: 0,
              limit: 5,
            }
          })
          setComments(response.data)
        }
        else if (campaignId) {
          const response = await api.get(`/campaign/${campaignId}/comments`, {
            params: {
              skip: 0,
              limit: 5,
            }
          })
          setComments(response.data)
        }
      }
      catch (error: any) {
        toast.error(error?.data?.error)
      }
    })()
  }, [postId, campaignId])

  const handleComment = useCallback(() => {

  }, [])

  return (
    <Grid container spacing={2}>
      {comments?.map((comment) => (
        <Grid item xs={12} key={comment.comment.commentId}>
          <Comment data={comment} />
        </Grid>
      ))}

      {/* <Card sx={{ width: 1, position: 'absolute', bottom: 0 }}>
        <Grid container spacing={2} >
          <Grid item xs='auto'>
            <Avatar src={user?.image} sx={{ width: 35, height: 35 }} />
          </Grid>
          <Grid item xs container spacing={1} alignItems='center'>
            <Grid item xs>
              <Controller
                control={control}
                name='content'
                render={({ field: { onChange, value } }) => (
                  <TextField
                    size='small'
                    variant='outlined'
                    fullWidth
                    multiline
                    value={value}
                    onChange={onChange}
                    placeholder='Viết bình luận...'
                  />
                )}
              />
            </Grid>
            <Grid item xs='auto'>
              <IconButton>
                <Send color="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Card> */}
    </Grid>
  )
}

export default ListComments