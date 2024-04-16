'use client'

import { Grid, Typography } from "@mui/material"
import { useSearchParams } from "next/navigation"

const SearchPosts = () => {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('searchTerm')

  return (
    <Grid container spacing={2.5} width={608}>
      <Grid item xs={12}>
        <Typography variant='h4' fontWeight={500}>Kết quả tìm kiếm cho: {searchTerm}</Typography>
      </Grid>
    </Grid>
  )
}

export default SearchPosts