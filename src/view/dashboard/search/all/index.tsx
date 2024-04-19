'use client'

import Campaign from "@/component/campaign"
import UserCard from "@/component/user-card"
import UserCardLoading from "@/component/user-card/loading"
import api_v2 from "@/service/api-v2"
import { CampaignType } from "@/type/campaign"
import { PostType } from "@/type/post"
import { UserNodeType } from "@/type/user"
import { NavigateNext } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  searchTerm: string
}

const SearchAllResult = ({ searchTerm }: Props) => {
  const [organizations, setOrganizations] = useState<UserNodeType[]>([])
  const [volunteers, setVolunteers] = useState<UserNodeType[]>([])
  const [posts, setPosts] = useState<PostType[]>([])
  const [campaigns, setCampaigns] = useState<CampaignType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await api_v2.get('/search', {
          params: {
            searchTerm,
            limit: 5,
            skip: 0,
          }
        })

        const data = response.data.hits
        setOrganizations(data.organizationNodesHits)
        setVolunteers(data.volunteerNodesHits)
        setPosts(data.postNodesHits)
        setCampaigns(data.campaignPostResponseDataHits)
        setIsLoading(false)
      }
      catch (error: any) {
        toast.error(error?.data?.error)
      }
    })()
  }, [searchTerm])

  const handleFollowOrganization = useCallback((userId: number) => (isFollow: boolean) => {
    setOrganizations((state) =>
      state.map((organization) =>
        organization.userId !== userId ? organization : { ...organization, isFollow }
      ))
  }, [])

  if (isLoading) {
    return <UserCardLoading />
  }
  else {
    return (
      <Grid container spacing={2.5}>
        {organizations.length !== 0 && (
          <Grid item xs={12} container spacing={2.5}>
            <Grid item xs={12}>
              <Link href={`/search/organizations?searchTerm=${searchTerm}`}>
                <Button endIcon={<NavigateNext color='action' />}>
                  <Typography>Tổ chức</Typography>
                </Button>
              </Link>
            </Grid>

            {organizations.map((organization) => (
              <Grid item xs={12} key={organization.userId}>
                <UserCard
                  data={organization}
                  setData={handleFollowOrganization(organization.userId)} />
              </Grid>
            ))}
          </Grid>
        )}

        {volunteers.length !== 0 && (
          <Grid item xs={12} container spacing={2.5}>
            <Grid item xs={12}>
              <Link href={`/search/volunteers?searchTerm=${searchTerm}`}>
                <Button endIcon={<NavigateNext color='action' />}>
                  <Typography>Tình nguyện viên</Typography>
                </Button>
              </Link>
            </Grid>

            {volunteers.map((volunteer) => (
              <Grid item xs={12} key={volunteer.userId}>
                <UserCard data={volunteer} />
              </Grid>
            ))}
          </Grid>
        )}

        {campaigns.length !== 0 && (
          <Grid item xs={12} container spacing={2.5}>
            <Grid item xs={12}>
              <Link href={`/search/campaigns?searchTerm=${searchTerm}`}>
                <Button endIcon={<NavigateNext color='action' />}>
                  <Typography>Bài viết liên quan</Typography>
                </Button>
              </Link>
            </Grid>

            {campaigns.map((campaign) => (
              <Grid item xs={12} key={campaign.campaign.campaignId}>
                <Campaign data={campaign} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    )
  }
}

export default SearchAllResult