'use client'

import { Grid, Typography } from '@mui/material'
import Post from '@/component/post'
import Certificate from '@/component/certificate'
import PersonalInformation from '@/component/personal-information'
import { PostType } from '@/type/post'
import { useAppSelector } from '@/lib/hook'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '@/service/api'
import ProfileCardLoading from '@/view/dashboard/profile/profile-card/loading'
import ProfileCard from '@/view/dashboard/profile/profile-card'
import PostLoading from '@/component/post/loading'
import PersonalInformationLoading from '@/component/personal-information/loading'
import { CampaignType } from '@/type/campaign'
import Campaign from '@/component/campaign'
import RecentCampaigns from '@/component/recent-campaigns'

interface Props {
  isVolunteer: boolean
}

const ProfileView = ({ isVolunteer }: Props) => {
  const { user, status } = useAppSelector(state => state.auth)
  const [posts, setPosts] = useState<PostType[]>([])
  const [campaigns, setCampaigns] = useState<CampaignType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (user?.userId) {
      (async () => {
        try {
          const response = await api.get(isVolunteer ? `/posts/users/${user.userId}` : `/campaign/organization/${user.userId}`, {
            params: {
              skip: 0,
              limit: 5,
            }
          })
          if (isVolunteer) {
            setPosts(response.data)
          }
          else {
            setCampaigns(response.data.campaigns)
          }
          setIsLoading(false)
        }
        catch (error: any) {
          toast.error(error?.data?.error)
        }
      })()
    }
  }, [user?.userId, isVolunteer])

  const onReactPost = useCallback((postId: string) => (totalLike: number) => {
    setPosts((state) => state.map((post) =>
      post.postId !== postId ? post : { ...post, isLiked: !post.isLiked, likeCount: totalLike }))
  }, [])

  const onReactCampaign = useCallback((campaignId: string) => (totalLike: number) => {
    setCampaigns((state) => state.map((campaign) =>
      campaign.campaign.campaignId !== campaignId ? campaign : { ...campaign, isLiked: !campaign.isLiked, likeCount: totalLike }))
  }, [])

  return (
    <Grid container pt={5} spacing={6}>
      <Grid item xs={12}>
        {status !== 'succeeded' ? (
          <ProfileCardLoading />
        ) : (
          <ProfileCard userData={user} />
        )}
      </Grid>

      <Grid item xs={12} container spacing={8}>
        <Grid item width={540}>
          <Grid container spacing={3} position='sticky' top={72}>
            {isVolunteer && (
              <Grid item xs={12}>
                <Certificate />
              </Grid>
            )}

            <Grid item xs={12}>
              {status !== 'succeeded' ? (
                <PersonalInformationLoading />
              ) : (
                <PersonalInformation userData={user} />
              )}
            </Grid>

            {!isVolunteer && (
              <Grid item xs={12}>
                <RecentCampaigns />
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs container justifyContent='center'>
          <Grid container maxWidth={680} spacing={4}>
            <Grid item xs={12}>
              <Typography variant='h4'>Bài đăng gần đây</Typography>
            </Grid>
            {(() => {
              if (isLoading) {
                return (
                  <Grid item xs={12} mt={-13}>
                    <PostLoading />
                  </Grid>
                )
              }
              else if (isVolunteer) {
                if (posts.length > 0) {
                  return (
                    posts.map((post) => (
                      <Grid item xs={12} key={post.postId}>
                        <Post data={post} onClickLove={onReactPost(post.postId)} />
                      </Grid>
                    ))
                  )
                }
                else {
                  return <Typography>Không có bài đăng nào.</Typography>
                }
              }
              else {
                if (campaigns.length > 0) {
                  return (
                    campaigns.map((campaign) => (
                      <Grid item xs={12} key={campaign.campaign.campaignId}>
                        <Campaign data={campaign} onClickLove={onReactCampaign(campaign.campaign.campaignId)} />
                      </Grid>
                    ))
                  )
                }
                else {
                  return <Typography>Không có bài đăng nào.</Typography>
                }
              }
            })()}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileView