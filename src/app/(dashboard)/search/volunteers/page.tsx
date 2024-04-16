import SearchVolunteersResult from "@/view/dashboard/search/volunteers"
import { Grid, Typography } from "@mui/material"

interface Props {
  searchParams: {
    searchTerm: string
  }
}

const SearchVolunteers = ({ searchParams: { searchTerm } }: Props) => {
  return (
    <Grid container spacing={2.5} width={608}>
      <Grid item xs={12}>
        <Typography variant='h4' fontWeight={500}>Người dùng liên quan tới từ khóa: {searchTerm}</Typography>
      </Grid>

      <Grid item xs={12}>
        <SearchVolunteersResult searchTerm={searchTerm} />
      </Grid>
    </Grid>
  )
}

export default SearchVolunteers