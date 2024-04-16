'use client'

import UserCard from "@/component/user-card"
import UserCardLoading from "@/component/user-card/loading"
import api from "@/service/api"
import { UserNodeType } from "@/type/user"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  searchTerm: string
}

const SearchVolunteersResult = ({ searchTerm }: Props) => {
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
            role: 'VOLUNTEER',
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

  if (isLoading) {
    return <UserCardLoading />
  }
  else {
    return (
      <Grid container spacing={2.5}>
        {data.map((volunteer) => (
          <Grid item xs={12} key={volunteer.userId}>
            <UserCard data={volunteer} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default SearchVolunteersResult