'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { PostType } from '@/type/post'

interface Props {
  data: PostType
}

const Post = ({ data }: Props) => {
  const theme = useTheme()
  const [postData, setPostData] = useState<PostType>(data)
  const { content, hashtag, media, loved, numberLoved, numberComments, activity, isEvent, created } = postData

  const handleaClickLove = useCallback(() => {
    setPostData(prevState => ({ ...prevState, loved: !prevState.loved }))
  }, [])

  return (
    <Card sx={{ mt: 4, width: 700, borderRadius: 2, py: 1, boxShadow: 'none' }}>
      <CardHeader
        avatar={<Avatar src={created?.avatar} />}
        title={
          <Grid container spacing={2}>
            <Grid item>
              <Typography fontWeight={500}>{created?.fullName}</Typography>
            </Grid>

            <Grid item xs container alignItems='center'>
              <Typography variant='body2' fontWeight={300}>• 10m</Typography>
            </Grid>
          </Grid>
        }
        subheader={<Typography color={theme.palette.text.secondary}>{activity}</Typography>}
      />

      <CardContent sx={{ py: 0 }}>
        <Grid container spacing={1} pb={2}>
          <Grid item xs={12}>
            <Typography whiteSpace='pre-line'>{content}</Typography>
          </Grid>

          <Grid item xs={12}>
            {hashtag?.map((item, index) => (
              <Typography fontWeight={500} color={theme.palette.text.disabled} key={index}>
                #{item}
              </Typography>
            ))}
          </Grid>
        </Grid>

        <Box position='relative' width={1} height={360} borderRadius={4}>
          <Image src={media} alt='media' fill style={{ borderRadius: 8 }} />
        </Box>
      </CardContent>

      <CardActions>
        <Grid container spacing={2}>
          <Grid item xs='auto' container alignItems='center'>
            <IconButton onClick={handleaClickLove}>
              <Image src={`/icons/${loved ? '' : 'dis'}loved.svg`} alt='loved' width={23} height={20} />
            </IconButton>
            <Typography>{numberLoved} lượt thích</Typography>
          </Grid>

          <Grid item xs='auto' container alignItems='center'>
            <IconButton>
              <Image src='/icons/comment.svg' alt='loved' width={23} height={20} />
            </IconButton>
            <Typography>{numberComments} bình luận</Typography>
          </Grid>

          <Grid item xs='auto' container alignItems='center'>
            <IconButton>
              <Image src='/icons/share.svg' alt='loved' width={23} height={20} />
            </IconButton>
            <Typography>Chia sẻ</Typography>
          </Grid>
        </Grid>
      </CardActions>
      {isEvent &&
        <CardActions>
          <Button fullWidth variant='outlined' sx={{ height: 40 }}>
            <Typography variant='body2' color={theme.palette.text.primary}>Ủng hộ</Typography>
          </Button>

          <Button fullWidth variant='contained' sx={{ height: 40 }}>
            <Typography variant='body2' color='inherit'>Tham gia ngay</Typography>
          </Button>
        </CardActions>
      }
    </Card>
  )
}

export default Post