'use client'

import Certificate from "@/component/certificate"
import CertificateLoading from "@/component/certificate/loading"
import PersonalInformation from "@/component/personal-information"
import PersonalInformationLoading from "@/component/personal-information/loading"
import Post from "@/component/post"
import PostLoading from "@/component/post/loading"
import api from "@/service/api"
import { PostType } from "@/type/post"
import { VolunteerType } from "@/type/user"
import ProfileCard from "@/view/dashboard/profile/profile-card"
import ProfileCardLoading from "@/view/dashboard/profile/profile-card/loading"
import { Grid, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  params: {
    userId: number
  }
}

const VolunteerProfile = ({ params: { userId } }: Props) => {
  const [volunteerData, setVolunteerData] = useState<VolunteerType | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          let response = await api.get(`/users/profile/volunteers/${userId}`)
          setVolunteerData(response.data)
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
          toast.error(error?.data?.error)
        }
      }
    })()
  }, [userId])

  const onReactPost = useCallback((postId: string) => (totalLike: number) => {
    setPosts((state) => state.map((post) =>
      post.postId !== postId ? post : { ...post, isLiked: !post.isLiked, likeCount: totalLike }))
  }, [])

  return (
    <Grid container pt={5} spacing={6}>
      <Grid item xs={12}>
        {isLoadingUser ? (
          <ProfileCardLoading />
        ) : (
          <ProfileCard isVolunteer volunteerData={volunteerData} setVolunteerData={setVolunteerData} />
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
                <PersonalInformation isVolunteer volunteerData={volunteerData} />
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
                  <Post data={item} onClickLove={onReactPost(item.postId)} />
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