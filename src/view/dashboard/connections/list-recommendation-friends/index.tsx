'use client'

import FriendCard from "@/component/friend-card"
import FriendCardLoading from "@/component/friend-card/loading"
import api from "@/service/api"
import { RecommendationFriendType } from "@/type/friend"
import { ControlPoint, NavigateNext } from "@mui/icons-material"
import { Avatar, Button, Grid, Typography } from "@mui/material"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

const ListRecommendationFriends = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<RecommendationFriendType[]>([])

  const fetchRecommendationFriends = useCallback(async (skip: number = 0, limit: number = 3, rangeEnd: number = 3) => {
    try {
      const response = await api.get('/users/get-recommend-friend', {
        params: {
          skip,
          limit,
          rangeEnd,
        }
      })

      setData(response.data)
      setIsLoading(false)
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [])

  const handleSendInviteFriendRequest = useCallback(async (friendId: number) => {
    try {
      await api.patch(`/users/add-friend?friendId=${friendId}`)
      setData((state) => state.map((friend) => friend.fiendSuggest.userId !== friendId ? friend : { ...friend, isSent: true }))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [])

  const handleCancelInviteFriendRequest = useCallback(async (friendId: number) => {
    try {
      await api.delete(`/users/delete-invite?friendId=${friendId}`)
      setData((state) => state.map((friend) => friend.fiendSuggest.userId !== friendId ? friend : { ...friend, isSent: false }))
    }
    catch (error: any) {
      toast.error(error?.data?.error)
    }
  }, [])

  useEffect(() => {
    fetchRecommendationFriends()
  }, [fetchRecommendationFriends])

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Button endIcon={<NavigateNext color='action' />}>
          <Typography>Có thể bạn quan tâm</Typography>
        </Button>
      </Grid>

      {(() => {
        if (isLoading) {
          return (
            <Grid item xs={12}>
              <FriendCardLoading />
            </Grid>
          )
        }
        else if (data.length !== 0) {
          return (
            data.map(({
              fiendSuggest: { userId, profileImageLink, fullName },
              numOfMutualFriend,
              mutualFriends,
              isSent
            }) => (
              <Grid item xs={12} key={userId}>
                <FriendCard
                  userId={userId}
                  avatar={profileImageLink}
                  name={fullName}
                  information={
                    <Grid container alignItems='center'>
                      <Typography variant='body2' color='text.primary' mr={1}>{numOfMutualFriend} bạn chung</Typography>
                      {mutualFriends.map((mutualFriend) => (
                        <Avatar src={mutualFriend.profileImageLink || ''} sx={{ width: 15, height: 15 }} key={mutualFriend.userId} />
                      ))}
                    </Grid>
                  }
                  action={
                    <Grid container alignItems='flex-end' height={45}>
                      <Button
                        startIcon={
                          <Image src={`/images/dashboard/connections/add-friend${isSent ? '-primary' : ''}.svg`} alt='add-friend' width={20} height={20} />
                        }
                        onClick={() => {
                          if (isSent) {
                            handleCancelInviteFriendRequest(userId)
                          }
                          else {
                            handleSendInviteFriendRequest(userId)
                          }
                        }}
                      >
                        <Typography variant='body2' color={isSent ? 'primary' : 'text.secondary'} fontWeight={300}>
                          {isSent ? 'Đã gửi' : 'Kết bạn'}
                        </Typography>
                      </Button>
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
              <Typography>Không có gợi ý nào cho bạn.</Typography>
            </Grid>
          )
        }
      })()}
    </Grid>
  )
}

export default ListRecommendationFriends