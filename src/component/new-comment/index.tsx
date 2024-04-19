import { useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { CommentType } from "@/type/comment"
import { yupResolver } from "@hookform/resolvers/yup"
import { Send } from "@mui/icons-material"
import { Avatar, Grid, IconButton, TextField } from "@mui/material"
import { Dispatch, SetStateAction, useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { object, string } from "yup"

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
  setComments: Dispatch<SetStateAction<CommentType[]>>
}

const NewComment = ({ postId, campaignId, setComments }: Props) => {
  const user = useAppSelector((state) => state.auth.user)
  const { control, handleSubmit, setValue } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleComment = useCallback(async (data: formData) => {
    if (user) {
      try {
        const content = data.content
        setValue('content', '')
        if (postId) {
          await api.post(`/posts/${postId}/comments`, { content })

          setComments((state) => [
            {
              user: {
                userId: user?.userId,
                fullName: user?.fullName,
                isBlock: false,
                profileImageLink: user?.image,
                role: null,
                isFriend: null,
                isFollow: null
              },
              comment: {
                commentId: -1,
                body: content,
                postNode: null,
                campaignNode: null,
                replyComment: null,
                userComment: null,
                createDate: new Date().toUTCString(),
              },
              haveReply: false
            },
            ...state])

        }
        else if (campaignId) {
          await api.post(`campaign/${campaignId}/comments`, { content })

          setComments((state) => [
            {
              user: {
                userId: user?.userId,
                fullName: user?.fullName,
                isBlock: false,
                profileImageLink: user?.image,
                role: null,
                isFriend: null,
                isFollow: null
              },
              comment: {
                commentId: -1,
                body: content,
                postNode: null,
                campaignNode: null,
                replyComment: null,
                userComment: null,
                createDate: new Date().toUTCString(),
              },
              haveReply: false
            },
            ...state])
        }
      }
      catch (error: any) {
        toast.error(error?.data?.error)
      }
    }
  }, [user, postId, campaignId, setComments, setValue])

  return (
    <Grid container spacing={2} p={2}>
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
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSubmit(handleComment)()
                    event.preventDefault()
                  }
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs='auto'>
          <IconButton onClick={handleSubmit(handleComment)}>
            <Send color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NewComment