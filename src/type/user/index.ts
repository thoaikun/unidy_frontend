type UserRoleType = 'VOLUNTEER' | 'SPONSOR' | 'ORGANIZATION'

type UserType = {
  userId: number
  fullName: string
  address: string
  phone: string
  sex: 'MALE' | 'FEMALE'
  dayOfBirth: string
  job: string
  workLocation: string
  role: UserRoleType
  image: string
}

type OrganizationType = {
  userId: number
  organizationName: string
  address: string
  phone: string
  email: string
  country: string
  image: string
  firebaseTopic: string
  isFollow: boolean
}

type UserNodeType = {
  userId: number
  fullName: string
  isBlock: boolean
  profileImageLink: string | null
  role: UserRoleType | null
}

enum FriendRequestStatus {
  decline = -1,
  accept = 1
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

type UserTransactionType = {
  userId: number
  fullName: string
  linkImage: string
}

export { FriendRequestStatus }
export type { UserRoleType, UserType, OrganizationType, UserNodeType, FriendRequestType, RecommendationFriendType, UserTransactionType }