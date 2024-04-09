'use client'

import Campaign from "@/component/campaign"
import JoinedCard from "@/component/joined-card"
import PersonalInformation from "@/component/personal-information"
import PersonalInformationLoading from "@/component/personal-information/loading"
import PostLoading from "@/component/post/loading"
import { joinedCardData } from "@/fakeData"
import api from "@/service/api"
import { CampaignType } from "@/type/campaign"
import { OrganizationType } from "@/type/user"
import ProfileCard from "@/view/dashboard/profile/profile-card"
import ProfileCardLoading from "@/view/dashboard/profile/profile-card/loading"
import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  params: {
    userId: number
  }
}

const OrganizationProfile = ({ params: { userId } }: Props) => {
  const [organizationData, setOrganizationData] = useState<OrganizationType | null>(null)
  const [isLoadingOrganization, setIsLoadingOrganization] = useState<boolean>(true)
  const [campaigns, setCampaigns] = useState<CampaignType[]>([])
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          let response = await api.get(`/users/profile/organizations/${userId}`)
          setOrganizationData(response.data)
          setIsLoadingOrganization(false)
          response = await api.get(`/campaign/organization/${userId}`, {
            params: {
              skip: 0,
              limit: 5,
            }
          })
          setCampaigns(response.data.campaigns)
          setIsLoadingPost(false)
        }
        catch (error: any) {
          toast.error(error.data.error)
        }
      }
    })()
  }, [userId])

  return (
    <Grid container pt={5} spacing={6}>
      <Grid item xs={12}>
        {isLoadingOrganization ? (
          <ProfileCardLoading />
        ) : (
          <ProfileCard isOrganization organizationData={organizationData} setOrganizationData={setOrganizationData} />
        )}
      </Grid>

      <Grid item xs={12} container spacing={8}>
        <Grid item maxWidth={424} >
          <Grid container spacing={3} position='sticky' top={72}>
            <Grid item xs={12}>
              {isLoadingOrganization ? (
                <PersonalInformationLoading />
              ) : (
                <PersonalInformation isOrganization organizationData={organizationData} />
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h4' my={3}>Các chiến dịch gần dây</Typography>
              <Grid container width={400} spacing={2.5}>
                {joinedCardData.map((item, index) => (
                  <Grid item key={index}>
                    <JoinedCard data={item} size='small' />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs container justifyContent='center'>
          <Grid container maxWidth={680} spacing={4}>
            <Grid item xs={12}>
              <Typography variant='h4'>Bài đăng gần đây</Typography>
            </Grid>
            {isLoadingPost ? (
              <Grid item xs={12} mt={-13}>
                <PostLoading />
              </Grid>
            ) : (
              campaigns.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Campaign data={item} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OrganizationProfile