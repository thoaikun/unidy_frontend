'use client'

import FriendCard from '@/component/friend-card'
import FriendCardLoading from '@/component/friend-card/loading'
import { fetchFriends } from '@/lib/features/friends/friendsSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { NavigateNext } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect } from 'react'

const ListFriends = () => {
  const { friends, status } = useAppSelector((state) => state.friends)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFriends())
  }, [dispatch])

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Button endIcon={<NavigateNext color='action' />}>
          <Typography>Bạn bè của bạn</Typography>
        </Button>
      </Grid>

      {(() => {
        if (status !== 'succeeded') {
          return (
            <Grid item xs={12}>
              <FriendCardLoading />
            </Grid>
          )
        }
        else if (friends.length !== 0) {
          return (
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
          )
        }
        else {
          <Grid item xs={12}>
            <Typography>Bạn chưa có bạn bè nào.</Typography>
          </Grid>
        }
      })()}
    </Grid >
  )
}

export default ListFriends