import Image from 'next/image'
import { Avatar, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { UserNodeType } from '@/type/user'
import Link from 'next/link'

interface Props {
  friends: UserNodeType[]
}

const trophies = ['Nhà tài phiệt', 'Thần từ thiện', 'Binh nhì từ thiện', 'Chiến thân tình cảm']
const colors = ['error', 'primary', 'info.main', 'success.main']

const ListFriends = ({ friends }: Props) => {
  return (
    <Card sx={{ width: 1, position: 'sticky', top: 96 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Image src='/images/dashboard/list-friends/trophy.svg' alt='trophy' width={28} height={45} />
          </Grid>

          <Grid item xs container alignItems='center'>
            <Grid item xs={12}>
              <Typography variant='h6'>Huân chương của bạn</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h6' color={(theme) => theme.palette.warning[400]}>Ông hoàng từ thiện</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ mx: 2 }} />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Typography fontWeight={500}>Bạn bè của bạn</Typography>
          </Grid>

          <Grid item xs={12} container spacing={1}>
            {friends?.map((item, index) => (
              <Grid item xs={12} key={item.userId}>
                <Link href={`/profile/${item.userId}`}>
                  <Button
                    fullWidth
                    startIcon={<Avatar src={item.profileImageLink || ''} sx={{ width: 32, height: 32 }} />}
                  >
                    <Grid container flexDirection='column' alignItems='flex-start' ml={1}>
                      <Grid item xs={12}>
                        <Typography variant='body2' color={(theme) => theme.palette.text.primary}>{item.fullName}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant='body2' color={colors[index % 4]}>{trophies[index % 4]}</Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ListFriends