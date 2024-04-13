'use client'

import FriendCard from "@/component/friend-card"
import LoadingFriendCard from "@/component/friend-card/loading"
import api from "@/service/api"
import { FriendRequestStatus, FriendRequestType } from "@/type/friend"
import { calculateDifferenceTime } from "@/utils/diff-time"
import { NavigateNext } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

const ListFriendRequests = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<FriendRequestType[]>([])

  const fetchFriendRequests = useCallback(async (skip: number = 0, limit: number = 3) => {
    try {
      const response = await api.get('/users/list-invite', {
        params: {
          skip,
          limit,
        }
      })

      setData(response.data)
      setIsLoading(false)
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [])

  const handleAcceptInvite = useCallback((friendId: number) => async () => {
    try {
      await api.patch(`/users/accept-friend?friendId=${friendId}`)
      setData((state) => state.map((request) => request.userRequest.userId !== friendId ? request : { ...request, status: FriendRequestStatus.accept }))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [])

  const handleDeclineInvite = useCallback((friendId: number) => async () => {
    try {
      await api.patch(`/users/delete-invite?friendId=${friendId}`)
      setData((state) => state.map((request) => request.userRequest.userId !== friendId ? request : { ...request, status: FriendRequestStatus.decline }))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [])

  useEffect(() => {
    fetchFriendRequests()
  }, [fetchFriendRequests])

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Button endIcon={<NavigateNext color='action' />}>
          <Typography>Lời mời kết bạn</Typography>
        </Button>
      </Grid>

      {(() => {
        if (isLoading) {
          return (
            <Grid item xs={12}>
              <LoadingFriendCard />
            </Grid>
          )
        }
        else if (data.length !== 0) {
          return (
            data.map(({ userRequest: { userId, profileImageLink, fullName }, requestAt }) => (
              <Grid item xs={12} key={userId}>
                <FriendCard
                  userId={userId}
                  avatar={profileImageLink}
                  name={fullName}
                  information={calculateDifferenceTime(new Date(requestAt))}
                  action={
                    <Grid container alignItems='flex-end' height={45} columnSpacing={1.25}>
                      <Grid item xs='auto'>
                        <Button
                          variant='outlined'
                          sx={{ height: 28 }}
                          color='inherit'
                          onClick={handleAcceptInvite(userId)}
                        >
                          <Typography variant='body2' color='inherit'>Xóa</Typography>
                        </Button>
                      </Grid>

                      <Grid item xs='auto'>
                        <Button
                          variant='contained'
                          sx={{ height: 28 }}
                          disableElevation
                          onClick={handleDeclineInvite(userId)}
                        >
                          <Typography variant='body2' color='text.contrast'>Đồng ý</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  }
                />
              </Grid>
            ))
          )
        }
        else {
          return (
            <Grid item xs={12}>
              <Typography>Không có lời mời kết bạn nào.</Typography>
            </Grid>
          )
        }
      })()}
    </Grid>
  )
}

export default ListFriendRequests