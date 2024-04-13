import Comment from "@/component/comment"
import CommentLoading from "@/component/comment/loading"
import EllipsisText from "@/component/ellipsis-text"
import NewComment from "@/component/new-comment"
import { theme } from "@/component/theme"
import { joinCampaign, reactCampaign } from "@/lib/features/campaigns/campaignsSlice"
import { openDonateModal } from "@/lib/features/modals/donate-modal/donateModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { CampaignDetailType } from "@/type/campaign"
import { CommentType } from "@/type/comment"
import { Avatar, Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  data: CampaignDetailType
  setData: Dispatch<SetStateAction<CampaignDetailType | undefined>>
}

const CampaignInteraction = ({ data: { campaignId, userNode, title, content, userLikes, } }: Props) => {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const [comments, setComments] = useState<CommentType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/campaign/${campaignId}/comments`, {
          params: {
            skip: 0,
            limit: 5,
          }
        })

        setComments(response.data)
        setIsLoading(false)
      }
      catch (error: any) {
        toast.error(error?.data?.error)
      }
    })()
  }, [campaignId])

  const isLiked = userLikes?.find((item) => item.userId === user?.userId)
  const handleaClickLove = useCallback(async () => {
    try {
      await api.patch(`/campaigns/${isLiked ? 'unlike' : 'like'}?campaignId=${campaignId}`)
      dispatch(reactCampaign({ campaignId, isLiked: !isLiked }))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [dispatch, campaignId, isLiked])

  const handleOpenDonateModal = useCallback(() => {
    dispatch(openDonateModal({
      campaignId,
      organizationUserId: userNode?.userId || 0,
    }))
  }, [dispatch, campaignId, userNode?.userId])

  const handleJoinCampaign = useCallback(async () => {
    try {
      await api.patch(`/campaign/register?campaignId=${campaignId}`)
      dispatch(joinCampaign(campaignId))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [campaignId, dispatch])

  return (
    <Grid container height={1} flexDirection='column'>
      <Box flex={1} sx={{ overflow: 'auto' }}>
        <DialogTitle mt={2}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs='auto'>
              <Link href={`/volunteers/${userNode?.userId}`}>
                <Avatar src={userNode?.profileImageLink || ''} />
              </Link>
            </Grid>

            <Grid item xs container>
              <Grid item xs={12}>
                <Link href={`/volunteers/${userNode?.userId}`}>
                  <Typography fontWeight={500}>{userNode?.fullName}</Typography>
                </Link>
              </Grid>

              <Grid item xs={12}>
                <Typography color={theme.palette.text.secondary}>{title}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <EllipsisText text={content} whiteSpace='pre-line' />
        </DialogContent>

        <DialogActions sx={{ pt: 0, px: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs='auto' container alignItems='center'>
              <IconButton onClick={handleaClickLove}>
                <Image src={`/images/dashboard/post-card/${isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>{userLikes.length || 0} lượt thích</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton>
                <Image src='/images/dashboard/post-card/comment.svg' alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>0 bình luận</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton>
                <Image src='/images/dashboard/post-card/share.svg' alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>Chia sẻ</Typography>
            </Grid>

            <Grid item xs={12} container spacing={1}>
              <Grid item xs={6}>
                <Button fullWidth variant='outlined' sx={{ height: 40 }} onClick={handleOpenDonateModal}>
                  <Typography variant='body2' color={theme.palette.text.primary}>Ủng hộ</Typography>
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button fullWidth variant='contained' sx={{ height: 40 }} disabled={true} onClick={handleJoinCampaign}>
                  <Typography variant='body2' color='inherit'>Tính năng tham gia</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ borderColor: '#000000' }} />
            </Grid>
          </Grid>
        </DialogActions>

        <DialogContent>
          {isLoading ? (
            <CommentLoading />
          ) : (
            <Grid container spacing={2}>
              {comments?.map((comment) => (
                <Grid item xs={12} key={comment.comment.commentId}>
                  <Comment data={comment} campaignId={campaignId} />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Box>

      <NewComment campaignId={campaignId} setComments={setComments} />
    </Grid>
  )
}

export default CampaignInteraction