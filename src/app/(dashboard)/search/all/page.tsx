import SearchAllResult from "@/view/dashboard/search/all"
import { Grid, Typography } from "@mui/material"

interface Props {
  searchParams: {
    searchTerm: string
  }
}

const SearchAll = ({ searchParams: { searchTerm } }: Props) => {
  return (
    <Grid container spacing={2.5} width={608}>
      <Grid item xs={12}>
        <Typography variant='h4' fontWeight={500}>Kết quả tìm kiếm cho: {searchTerm}</Typography>
      </Grid>

      <Grid item xs={12}>
        <SearchAllResult searchTerm={searchTerm} />
      </Grid>
    </Grid>
  )
}

export default SearchAll