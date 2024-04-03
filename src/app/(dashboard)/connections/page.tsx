import ListFriendRequests from '@/view/dashboard/connections/list-friend-requests'
import ListFriends from '@/view/dashboard/connections/list-friends'
import ListRecommendationFriends from '@/view/dashboard/connections/list-recommendation-friends'
import { Grid } from '@mui/material'

const ConnectionsPage = () => {
  return (
    <Grid container spacing={2.5} width={608}>
      <Grid item xs={12}>
        <ListFriendRequests />
      </Grid>

      <Grid item xs={12}>
        <ListRecommendationFriends />
      </Grid>

      <Grid item xs={12}>
        <ListFriends />
      </Grid>
    </Grid>
  )
}

export default ConnectionsPage