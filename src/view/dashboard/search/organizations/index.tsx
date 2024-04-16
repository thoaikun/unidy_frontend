'use client'

import UserCard from "@/component/user-card"
import UserCardLoading from "@/component/user-card/loading"
import api from "@/service/api"
import { UserNodeType } from "@/type/user"
import { Grid } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  searchTerm: string
}

const SearchOrganizationsResult = ({ searchTerm }: Props) => {
  const [data, setData] = useState<UserNodeType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/search/user', {
          params: {
            searchTerm,
            limit: 5,
            skip: 0,
            role: 'ORGANIZATION',
          }
        })

        setData(response.data.hits)
        setIsLoading(false)
      }
      catch (error: any) {
        toast.error(error?.data?.error)
      }
    })()
  }, [searchTerm])

  const handleFollowOrganization = useCallback((userId: number) => (isFollow: boolean) => {
    setData((state) =>
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
        {data.map((organization) => (
          <Grid item xs={12} key={organization.userId}>
            <UserCard
              data={organization}
              setData={handleFollowOrganization(organization.userId)} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default SearchOrganizationsResult