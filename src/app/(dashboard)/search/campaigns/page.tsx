import SearchCampaignsResult from "@/view/dashboard/search/campaigns"
import { Grid, Typography } from "@mui/material"

interface Props {
  searchParams: {
    searchTerm: string
  }
}

const SearchCampaigns = ({ searchParams: { searchTerm } }: Props) => {
  return (
    <Grid container spacing={2.5} width={608}>
      <Grid item xs={12}>
        <Typography variant='h4' fontWeight={500}>Bài viết liên quan tới từ khóa: {searchTerm}</Typography>
      </Grid>

      <Grid item xs={12}>
        <SearchCampaignsResult searchTerm={searchTerm} />
      </Grid>
    </Grid>
  )
}

export default SearchCampaigns