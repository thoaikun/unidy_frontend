'use client'

import { OrganizationType, UserType, VolunteerType } from '@/type/user'
import { Button, Card, CardActions, CardContent, Divider, Grid, Typography, useTheme } from '@mui/material'

interface Props {
  isOrganization?: boolean
  isVolunteer?: boolean
  userData?: (UserType & OrganizationType) | null
  volunteerData?: VolunteerType | null
  organizationData?: OrganizationType | null
}

const PersonalInformation = ({ isVolunteer, isOrganization, userData, volunteerData, organizationData }: Props) => {
  const theme = useTheme()

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

          {(() => {
            if (isVolunteer) {
              return (
                [
                  { title: 'Ngày sinh', value: volunteerData?.dayOfBirth && new Date(volunteerData.dayOfBirth).toLocaleDateString() },
                  { title: 'Giới tính', value: volunteerData?.sex ? (volunteerData?.sex !== 'MALE' ? 'Nam' : 'Nữ') : 'Không có thông tin' },
                  { title: 'Công việc', value: volunteerData?.job },
                  { title: 'Tại', value: volunteerData?.workLocation },
                ].map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography variant='body2' color={theme.palette.text.primary}>
                      {item.title}: <span style={{ fontWeight: 300 }}>{item.value}</span>
                    </Typography>
                  </Grid>
                ))
              )
            }
            else if (isOrganization) {
              return (
                [
                  { title: 'Ngày thành lập', value: 'Không có thông tin' },
                  { title: 'Mô tả', value: 'Không có thông tin' },
                  { title: 'Trụ sở chính', value: `${organizationData?.address}, ${organizationData?.country}` },
                ].map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography variant='body2' color={theme.palette.text.primary}>
                      {item.title}: <span style={{ fontWeight: 300 }}>{item.value}</span>
                    </Typography>
                  </Grid>
                ))
              )
            }
            else if (userData?.role !== 'ORGANIZATION') {
              return (
                [
                  { title: 'Ngày sinh', value: userData?.dayOfBirth && new Date(userData.dayOfBirth).toLocaleDateString() },
                  { title: 'Giới tính', value: userData?.sex ? (userData?.sex !== 'MALE' ? 'Nam' : 'Nữ') : 'Không có thông tin' },
                  { title: 'Công việc', value: userData?.job },
                  { title: 'Tại', value: userData?.workLocation },
                ].map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography variant='body2' color={theme.palette.text.primary}>
                      {item.title}: <span style={{ fontWeight: 300 }}>{item.value}</span>
                    </Typography>
                  </Grid>
                ))
              )
            }
            else {
              return (
                [
                  { title: 'Ngày thành lập', value: 'Không có thông tin' },
                  { title: 'Mô tả', value: 'Không có thông tin' },
                  { title: 'Trụ sở chính', value: `${userData?.address}, ${userData?.country}` },
                ].map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography variant='body2' color={theme.palette.text.primary}>
                      {item.title}: <span style={{ fontWeight: 300 }}>{item.value}</span>
                    </Typography>
                  </Grid>
                ))
              )
            }
          })()}
        </Grid>
      </CardContent>

      {!isVolunteer && !isOrganization && (
        <CardActions sx={{ px: 2 }}>
          <Button sx={{ border: '1px dashed #d1d4d7' }} fullWidth>
            <Typography variant='caption' color={theme.palette.text.primary}>Chỉnh sửa thông tin</Typography>
          </Button>
        </CardActions>
      )}
    </Card >
  )
}

export default PersonalInformation