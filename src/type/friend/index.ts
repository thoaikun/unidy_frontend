import { UserNodeType } from "../user"

enum FriendRequestStatus {
  decline = -1,
  accept = 1,
}

type FriendRequestType = {
  userRequest: UserNodeType
  requestAt: string
  status?: FriendRequestStatus
}

type RecommendationFriendType = {
  fiendSuggest: UserNodeType
  numOfMutualFriend: number
  mutualFriends: UserNodeType[]
  isSent?: boolean
}

export { FriendRequestStatus }
export type { FriendRequestType, RecommendationFriendType }