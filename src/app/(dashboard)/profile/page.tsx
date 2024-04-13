'use client'

import { Grid, Typography } from '@mui/material'
import Post from '@/component/post'
import Certificate from '@/component/certificate'
import PersonalInformation from '@/component/personal-information'
import JoinedCard from '@/component/joined-card'
import { PostType } from '@/type/post'
import { useAppSelector } from '@/lib/hook'
import { joinedCardData, postsData } from '@/fakeData'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '@/service/api'
import ProfileCardLoading from '@/view/dashboard/profile/profile-card/loading'
import ProfileCard from '@/view/dashboard/profile/profile-card'
import PostLoading from '@/component/post/loading'
import PersonalInformationLoading from '@/component/personal-information/loading'
import CertificateLoading from '@/component/certificate/loading'

const ProfilePage = () => {
  const { user, status } = useAppSelector(state => state.auth)
  const isOrganization = user?.role === 'ORGANIZATION'
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(true)

  useEffect(() => {
    if (user?.userId) {
      (async () => {
        try {
          const response = await api.get(`/posts/users/${user?.userId}`, {
            params: {
              skip: 0,
              limit: 5,
            }
          })
          setPosts(response.data)
          setIsLoadingPost(false)
          // setPosts(postsData)
          // setTimeout(() => setIsLoadingPost(false), 2000)
        }
        catch (error: any) {
          toast.error(error?.data?.error)
        }
      })()
    }
  }, [user?.userId])

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
        <Grid item maxWidth={424} >
          <Grid container spacing={3} position='sticky' top={72}>
            {!isOrganization && (
              <Grid item xs={12}>
                {status !== 'succeeded' ? (
                  <CertificateLoading />
                ) : (
                  <Certificate />
                )}
              </Grid>
            )}

            <Grid item xs={12}>
              {status !== 'succeeded' ? (
                <PersonalInformationLoading />
              ) : (
                <PersonalInformation userData={user} />
              )}
            </Grid>

            {isOrganization &&
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
            }
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
            ) : (posts.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Post data={item} />
              </Grid>
            )))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfilePage