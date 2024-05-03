import Comment from "@/component/comment"
import CommentLoading from "@/component/comment/loading"
import EllipsisText from "@/component/ellipsis-text"
import NewComment from "@/component/new-comment"
import { theme } from "@/component/theme"
import UserAvatar from "@/component/user-avatar"
import UserName from "@/component/user-name"
import { joinCampaign, reactCampaign } from "@/lib/features/campaigns/campaignsSlice"
import { closeCampaignDetail } from "@/lib/features/modals/campaign-detail-modal/campaignDetailModalSlice"
import { openDonateModal } from "@/lib/features/modals/donate-modal/donateModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import api from "@/service/api"
import { CampaignType } from "@/type/campaign"
import { CommentType } from "@/type/comment"
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from "@mui/material"
import Image from "next/image"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  data: CampaignType
  setData: Dispatch<SetStateAction<CampaignType | undefined>>
}

const CampaignInteraction = ({
  data: {
    campaign: { campaignId, title, content },
    organizationNode,
    isLiked,
    joinedStatus,
    likeCount,
    numberComments
  },
  setData,
}: Props) => {
  const isJoined: boolean | null = Boolean(joinedStatus)

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

  const handleClose = useCallback(() => {
    dispatch(closeCampaignDetail())
  }, [dispatch])

  const handleClickLove = useCallback(async () => {
    try {
      const response = await api.patch(`/campaign/${campaignId}/${isLiked ? 'unlike' : 'like'}`)
      const totalLike = response.data.totalLike
      setData((state) => state && ({
        ...state,
        isLiked: !state.isLiked,
        likeCount: totalLike
      }))
      dispatch(reactCampaign({ campaignId, totalLike }))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [dispatch, campaignId, isLiked, setData])

  const handleShareCampaign = useCallback(() => {
    toast.info('Tính năng đang được phát triển')
  }, [])

  const handleOpenDonateModal = useCallback(() => {
    dispatch(openDonateModal({
      campaignId,
      organizationUserId: user?.userId || 0,
    }))
  }, [dispatch, campaignId, user?.userId])

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
              <UserAvatar data={organizationNode} onClick={handleClose} />
            </Grid>

            <Grid item xs container>
              <Grid item xs={12}>
                <UserName data={organizationNode} typographyProps={{ fontWeight: 500 }} onClick={handleClose} />
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
              <IconButton onClick={handleClickLove}>
                <Image src={`/images/dashboard/post-card/${isLiked ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>{likeCount} lượt thích</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton disabled>
                <Image src='/images/dashboard/post-card/comment.svg' alt='loved' width={23} height={20} />
              </IconButton>
              <Typography>{numberComments} bình luận</Typography>
            </Grid>

            <Grid item xs='auto' container alignItems='center'>
              <IconButton onClick={handleShareCampaign}>
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
                <Button fullWidth variant='contained' sx={{ height: 40 }} disabled={Boolean(isJoined)} onClick={handleJoinCampaign}>
                  <Typography variant='body2' color='inherit'>
                    {(() => {
                      switch (joinedStatus) {
                        case null: return 'Tham gia ngay'
                        case 'APPROVE': return 'Đã tham gia'
                        case 'NOT_APPROVE_YET': return 'Đang chờ duyệt'
                        case 'REJECT': return 'Bị từ chối'
                        default: return 'Tham gia ngay'
                      }
                    })()}
                  </Typography>
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