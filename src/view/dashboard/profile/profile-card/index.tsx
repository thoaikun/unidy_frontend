import { UserType } from "@/type/user"
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

interface Props {
  userData: (UserType & { isFriend?: boolean }) | null
}

const ProfileCard = ({ userData }: Props) => {
  return (
    <Card sx={{ borderRadius: 3, position: 'relative' }}>
      <CardMedia
        component='img'
        sx={{ height: 320 }}
        image='/examples/profile-cover.png'
      />

      <Avatar
        src={userData?.image}
        sx={{ width: 156, height: 156, position: 'absolute', left: 78, bottom: 22, border: '1px solid #ffffff' }}
      />

      <Box ml={33} mb={2}>
        <CardContent>
          <Typography variant='h3'>{userData?.fullName || 'Unknown name'}</Typography>
        </CardContent>

        <CardActions>
          {(() => {
            if (userData?.role !== 'ORGANIZATION') {
              if (userData?.isFriend) {
                return (
                  <>
                    <Button variant='contained' sx={{ width: 210, height: 30 }} disableElevation>Nhắn tin</Button>
                    <Button variant='outlined' sx={{ width: 148, height: 30 }}>Xóa kết bạn</Button>
                  </>
                )
              }
              else {
                return (
                  <Button variant='contained' sx={{ width: 148, height: 30 }} disableElevation>Kết bạn</Button>
                )
              }
            }
            else {
              return (
                <Button variant='contained' sx={{ width: 210, height: 30 }} disableElevation>Theo dõi</Button>
              )
            }
          })()}
        </CardActions>
      </Box>
    </Card>
  )
}

export default ProfileCard