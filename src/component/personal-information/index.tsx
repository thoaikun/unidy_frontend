'use client'

import { UserType } from '@/type/user'
import { Button, Card, CardActions, CardContent, Divider, Grid, Typography, useTheme } from '@mui/material'

interface Props {
  userData: UserType | null
}

const PersonalInformation = ({ userData }: Props) => {
  const theme = useTheme()
  const isOrganization = userData?.role === 'ORGANIZATION'

  return (
    <Card sx={{ p: 1 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography fontWeight={500}>Thông tin {isOrganization ? 'tổ chức' : 'cá nhân'}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {isOrganization ? (
            [
              { title: 'Ngày thành lập', value: '09/10/2002' },
              { title: 'Mô tả', value: 'International Volunteer HQ Limited is a New Zealand-based volunteer travel company founded by Daniel John Radcliffe in 2007. In September 2015, it has sent 50,000 volunteers overseas to 30 countries on 200 different projects' },
              { title: 'Trụ sở chính:', value: 'New zealand' },
            ].map((item, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant='body2' color={theme.palette.text.primary}>
                  {item.title}: <span style={{ fontWeight: 300 }}>{item.value}</span>
                </Typography>
              </Grid>
            ))
          ) : (
            [
              { title: 'Ngày sinh', value: userData?.dayOfBirth && new Date(userData.dayOfBirth).toLocaleDateString() },
              { title: 'Giới tính', value: userData?.sex === 'FEMALE' ? 'Nam' : 'Nữ' },
              { title: 'Công việc', value: userData?.job },
              { title: 'Tại', value: userData?.workLocation },
            ].map((item, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant='body2' color={theme.palette.text.primary}>
                  {item.title}: <span style={{ fontWeight: 300 }}>{item.value}</span>
                </Typography>
              </Grid>
            ))
          )}
        </Grid>
      </CardContent>

      <CardActions sx={{ px: 2 }}>
        <Button sx={{ border: '1px dashed #d1d4d7' }} fullWidth>
          <Typography variant='caption' color={theme.palette.text.primary}>Chỉnh sửa thông tin</Typography>
        </Button>
      </CardActions>
    </Card >
  )
}

export default PersonalInformation