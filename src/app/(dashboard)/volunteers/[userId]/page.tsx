'use client'

import Certificate from "@/component/certificate"
import CertificateLoading from "@/component/certificate/loading"
import PersonalInformation from "@/component/personal-information"
import PersonalInformationLoading from "@/component/personal-information/loading"
import Post from "@/component/post"
import PostLoading from "@/component/post/loading"
import api from "@/service/api"
import { PostType } from "@/type/post"
import { UserType } from "@/type/user"
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

const VolunteerProfile = ({ params: { userId } }: Props) => {
  const [userData, setUserData] = useState<UserType | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        let response = await api.get(`/users/profile/volunteers/${userId}`)
        setUserData(response.data)
        setIsLoadingUser(false)
        response = await api.get(`/posts/users/${userId}`, {
          params: {
            skip: 0,
            limit: 5,
          }
        })
        setPosts(response.data)
        setIsLoadingPost(false)
      }
      catch (error: any) {
        toast.error(error.data.error)
      }
    })()
  }, [userId])

  return (
    <Grid container pt={5} spacing={6}>
      <Grid item xs={12}>
        {isLoadingUser ? (
          <ProfileCardLoading />
        ) : (
          <ProfileCard userData={userData} />
        )}
      </Grid>

      <Grid item xs={12} container spacing={8}>
        <Grid item maxWidth={424} >
          <Grid container spacing={3} position='sticky' top={72}>
            <Grid item xs={12}>
              {isLoadingUser ? (
                <CertificateLoading />
              ) : (
                <Certificate />
              )}
            </Grid>

            <Grid item xs={12}>
              {isLoadingUser ? (
                <PersonalInformationLoading />
              ) : (
                <PersonalInformation userData={userData} />
              )}
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
              posts.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Post data={item} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default VolunteerProfile