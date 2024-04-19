import api from "@/service/api"
import { CommentType } from "@/type/comment"
import { Grid, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import CommentLoading from "./loading"
import UserAvatar from "../user-avatar"
import UserName from "../user-name"
import { calculateDifferenceTime } from "@/utils/diff-time"

interface Props {
  data: CommentType
  postId?: string
  campaignId?: string
}

const Comment = ({
  data: {
    user,
    comment: {
      commentId,
      body,
      createDate,
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
        <UserAvatar data={user} avatarProps={{ sx: { width: 35, height: 35 } }} />
      </Grid>
      <Grid item xs>
        <UserName data={user} typographyProps={{ variant: 'h6' }} />
        <Typography variant='body1'>{body}</Typography>

        <Grid container spacing={2}>
          <Grid item xs='auto'>
            <Typography variant='caption'>{calculateDifferenceTime(createDate)}</Typography>
          </Grid>

          <Grid item xs>
            {(postId || campaignId) && (
              <Typography
                variant='caption'
                fontWeight={700}
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
          </Grid>
        </Grid>

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