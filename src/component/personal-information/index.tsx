'use client'

import { OrganizationType, UserType } from '@/type/user'
import { Button, Card, CardActions, CardContent, Divider, Grid, Typography, useTheme } from '@mui/material'

interface Props {
  isOrganization?: boolean
  userData?: UserType | null
  organizationData?: OrganizationType | null
  editable?: boolean
}

const PersonalInformation = ({ isOrganization, userData, organizationData, editable }: Props) => {
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

          {isOrganization ? (
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
          ) : (
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
          )}
        </Grid>
      </CardContent>

      {editable && (
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