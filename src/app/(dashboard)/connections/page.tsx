'use client'

import FriendCard from '@/component/friend-card'
import LoadingFriendCard from '@/component/friend-card/loading'
import { fetchFriends } from '@/lib/features/friends/friendsSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import api from '@/service/api'
import { FriendRequestStatus, FriendRequestType, RecommendationFriendType } from '@/type/user'
import { calculateDifferenceTime } from '@/utils/diff-time'
import { NavigateNext } from '@mui/icons-material'
import { Avatar, Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ConnectionsPage = () => {
  const [isLoadingFriendRequests, setIsLoadingFriendRequests] = useState<boolean>(true)
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([])

  const fetchFriendRequests = useCallback(async (skip: number = 0, limit: number = 3) => {
    try {
      const response = await api.get('/users/list-invite', {
        params: {
          skip,
          limit,
        }
      })

      setFriendRequests(response.data)
      setIsLoadingFriendRequests(false)
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [])

  const handleAcceptInvite = useCallback((friendId: number) => async () => {
    try {
      await api.patch(`/users/accept-friend?friendId=${friendId}`)
      setFriendRequests((state) => state.map((request) => request.userRequest.userId !== friendId ? request : { ...request, status: FriendRequestStatus.accept }))
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [])

  const handleDeclineInvite = useCallback((friendId: number) => async () => {
    try {
      await api.patch(`/users/delete-invite?friendId=${friendId}`)
      setFriendRequests((state) => state.map((request) => request.userRequest.userId !== friendId ? request : { ...request, status: FriendRequestStatus.decline }))
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [])

  const [isLoadingRecommendationFriends, setIsLoadingRecommendationFriends] = useState<boolean>(true)
  const [recommendationFriends, setRecommendationFriends] = useState<RecommendationFriendType[]>([])

  const fetchRecommendationFriends = useCallback(async (skip: number = 0, limit: number = 3, rangeEnd: number = 3) => {
    try {
      const response = await api.get('/users/get-recommend-friend', {
        params: {
          skip,
          limit,
          rangeEnd,
        }
      })

      setRecommendationFriends(response.data)
      setIsLoadingRecommendationFriends(false)
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [])

  const handleSendInviteFriendRequest = useCallback((friendId: number) => async () => {
    try {
      const response = await api.patch(`/users/add-friend?friendId=${friendId}`)
      setRecommendationFriends((state) => state.map((friend) => friend.fiendSuggest.userId !== friendId ? friend : { ...friend, isSent: true }))
    }
    catch (error: any) {
      toast.error(error.data.error)
    }
  }, [])

  const handleCancelnviteFriendRequest = useCallback((friendId: number) => async () => {

  }, [])

  const { friends, status } = useAppSelector((state) => state.friends)
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchFriendRequests()
    fetchRecommendationFriends()
    dispatch(fetchFriends())
  }, [fetchFriendRequests, fetchRecommendationFriends, dispatch])

  return (
    <Grid container spacing={2.5} width={608}>
      <Grid item xs={12}>
        <Button endIcon={<NavigateNext color='action' />}>
          <Typography>Lời mời kết bạn</Typography>
        </Button>
      </Grid>

      {isLoadingFriendRequests ? (
        <Grid item xs={12}>
          <LoadingFriendCard />
        </Grid>
      ) : (
        friendRequests.map(({ userRequest: { userId, profileImageLink, fullName }, requestAt }) => (
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
      )}

      <Grid item xs={12}>
        <Button endIcon={<NavigateNext color='action' />}>
          <Typography>Có thể bạn quan tâm</Typography>
        </Button>
      </Grid>

      {isLoadingRecommendationFriends ? (
        <Grid item xs={12}>
          <LoadingFriendCard />
        </Grid>
      ) : (
        recommendationFriends.map(({
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
                    startIcon={<Image src='/images/dashboard/connections/add-friend.svg' alt='add-friend' width={20} height={20} />}
                    onClick={handleSendInviteFriendRequest(userId)}
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
      )}

      <Grid item xs={12}>
        <Button endIcon={<NavigateNext color='action' />}>
          <Typography>Bạn bè của bạn</Typography>
        </Button>
      </Grid>

      {status !== 'succeeded' ? (
        <Grid item xs={12}>
          <LoadingFriendCard />
        </Grid>
      ) : (
        friends.map(({ userId, profileImageLink, fullName }) => (
          <Grid item xs={12} key={userId}>
            <FriendCard
              userId={userId}
              avatar={profileImageLink}
              name={fullName}
              action={
                <Grid container alignItems='flex-end' height={45}>
                  <Button startIcon={<Image src='/images/dashboard/connections/friend-primary.svg' alt='friend' width={20} height={20} />}>
                    <Typography variant='body2' color='primary' fontWeight={300}>
                      Bạn bè
                    </Typography>
                  </Button>
                </Grid>
              }
            />
          </Grid>
        ))
      )}
    </Grid >
  )
}

export default ConnectionsPage