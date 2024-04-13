import api from "@/service/api"
import { CommentType } from "@/type/comment"
import { Avatar, Grid, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import CommentLoading from "./loading"

interface Props {
  data: CommentType
  postId?: string
  campaignId?: string
}

const Comment = ({
  data: {
    user:
    {
      profileImageLink,
      fullName,
    },
    comment: {
      commentId,
      body,
    },
    haveReply,
  },
  postId,
  campaignId,
}: Props) => {
  const [replyComments, setReplyComments] = useState<CommentType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleReply = useCallback(() => {
    toast.info('Tính năng đang được phát triển')
  }, [])

  useEffect(() => {
    (async () => {
      if (haveReply && commentId) {
        try {
          if (postId) {
            const response = await api.get(`posts/${postId}/comments/${commentId}/replies`, {
              params: {
                skip: 0,
                limit: 5,
              }
            })
            setReplyComments(response.data)
          }
          else if (campaignId) {
            const response = await api.get(`/campaign/${campaignId}/comments/${commentId}/replies`, {
              params: {
                skip: 0,
                limit: 5,
              }
            })
            setReplyComments(response.data)
          }

          setIsLoading(false)
        }
        catch (error: any) {
          toast.error(error?.data?.error)
        }
      }
    })()
  }, [haveReply, commentId, postId, campaignId])

  return (
    <Grid container spacing={2}>
      <Grid item xs='auto'>
        <Avatar src={profileImageLink || ''} sx={{ width: 35, height: 35 }} />
      </Grid>
      <Grid item xs>
        <Typography variant='h6'>{fullName}</Typography>
        <Typography variant='body1'>{body}</Typography>
        {(postId || campaignId) && (
          <Typography
            variant='caption'
            sx={{
              cursor: 'pointer',
              ':hover': {
                textDecoration: 'underline'
              }
            }}
            onClick={handleReply}
          >
            Trả lời
          </Typography>
        )}

        {haveReply && (
          isLoading ? (
            <CommentLoading />
          ) : (
            <Grid container spacing={2} mt={0.5}>
              {replyComments?.map((comment) => (
                <Grid item xs={12} key={comment.comment.commentId}>
                  <Comment data={comment} />
                </Grid>
              ))}
            </Grid>
          )
        )}
      </Grid>
    </Grid>
  )
}

export default Comment