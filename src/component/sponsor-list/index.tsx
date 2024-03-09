'use client'

import { listSponsorData } from "@/fakeData/listSponsor"
import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material"
import Image from "next/image"
import { useCallback, useState } from "react"

enum ListMode {
  recent,
  top,
}

const SponsorList = () => {
  const [mode, setMode] = useState<ListMode>(ListMode.recent)
  const handleChangeMode = useCallback((newMode: ListMode) => () => {
    setMode(newMode)
  }, [])

  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        title='Nhà hảo tâm'
        action={
          <>
            <Button
              startIcon={
                <Image
                  src={`/icons/recent${mode === ListMode.recent ? '-selected' : ''}.svg`}
                  alt='recent-icon'
                  width={15}
                  height={15}
                />
              }
              onClick={handleChangeMode(ListMode.recent)}><Typography>Gần nhất</Typography></Button>
            <Button
              startIcon={
                <Image
                  src={`/icons/top${mode === ListMode.top ? '-selected' : ''}.svg`}
                  alt='top-icon'
                  width={15}
                  height={15}
                />
              }
              onClick={handleChangeMode(ListMode.top)}
            ><Typography>Top</Typography></Button>
          </>
        }
      />

      <CardContent>
        <Grid container spacing={2}>
          {listSponsorData?.map((item, index) => (
            <Grid item container spacing={2} key={index}>
              <Grid item xs='auto'>
                <Avatar src={item.profileImageLink || ''} sx={{ width: 40, height: 40 }} />
              </Grid>
              <Grid item xs container alignItems='center'>
                <Typography>{item.fullName}</Typography>
              </Grid>
              <Grid item xs='auto' container alignItems='center'>
                <Typography>140 triệu</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SponsorList