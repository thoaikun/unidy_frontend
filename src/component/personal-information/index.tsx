'use client'

import { Button, Card, CardActions, CardContent, Divider, Grid, Typography, useTheme } from '@mui/material'

interface Props {
  isOrganization: boolean
}

const PersonalInformation = ({ isOrganization }: Props) => {
  const theme = useTheme()

  return (
    <Card sx={{ width: 360, p: 1 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography fontWeight={500}>Thông tin {isOrganization ? 'tổ chức' : 'cá nhân'}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {isOrganization ?
            <>
              <Grid item xs={12}>
                <Typography variant='body2' color={theme.palette.text.primary}>
                  Ngày thành lập: <span style={{ fontWeight: 300 }}>09/10/2002</span>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body2' color={theme.palette.text.primary}>Mô tả:</Typography>
                <Typography variant='body2' color={theme.palette.text.primary} fontWeight={300}>
                  International Volunteer HQ Limited is a New Zealand-based volunteer travel company founded by Daniel John Radcliffe in 2007. In September 2015, it has sent 50,000 volunteers overseas to 30 countries on 200 different projects
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body2' color={theme.palette.text.primary}>
                  Trụ sở chính: <span style={{ fontWeight: 300 }}>New zealand</span>
                </Typography>
              </Grid>
            </> :
            <>
              <Grid item xs={12}>
                <Typography variant='body2' color={theme.palette.text.primary}>
                  Ngày sinh: <span style={{ fontWeight: 300 }}>09/10/2002</span>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body2' color={theme.palette.text.primary}>
                  Giới tính: <span style={{ fontWeight: 300 }}>Nam</span>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body2' color={theme.palette.text.primary}>
                  Công việc: <span style={{ fontWeight: 300 }}>Sinh viên</span>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body2' color={theme.palette.text.primary}>
                  Tại: <span style={{ fontWeight: 300 }}>Đại học bách khoa TPHCM</span>
                </Typography>
              </Grid>
            </>
          }
        </Grid>
      </CardContent>

      <CardActions sx={{ px: 2 }}>
        <Button sx={{ border: '1px dashed #d1d4d7' }} fullWidth>
          <Typography variant='caption' color={theme.palette.text.primary}>Chỉnh sửa thông tin</Typography>
        </Button>
      </CardActions>
    </Card>
  )
}

export default PersonalInformation