import SearchOrganizationsResult from "@/view/dashboard/search/organizations"
import { Grid, Typography } from "@mui/material"

interface Props {
  searchParams: {
    searchTerm: string
  }
}

const SearchOrganizations = ({ searchParams: { searchTerm } }: Props) => {
  return (
    <Grid container spacing={2.5} width={608}>
      <Grid item xs={12}>
        <Typography variant='h4' fontWeight={500}>Các tổ chức liên quan đến từ khóa: {searchTerm}</Typography>
      </Grid>

      <Grid item xs={12}>
        <SearchOrganizationsResult searchTerm={searchTerm} />
      </Grid>
    </Grid>
  )
}

export default SearchOrganizations