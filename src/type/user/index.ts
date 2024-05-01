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

type VolunteerType = UserType & {
  isFriend: boolean
  isRequested: boolean
  isRequesting: boolean
}

type UserProfileImageType = {
  imageId: number
  linkImage: string
  updateDate: string
  userId: number
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
  isApproved: boolean
  overallFigure: {
    totalCampaign: number,
    totalVolunteer: number,
    totalTransaction: number,
    totalTransactionInDay: number,
  }
}

type OrganizationNodeType = {
  organizationId: number
  organizationName: string
  address: string
  phone: string
  email: string
  status: string
  country: string
  userId: number
  firebaseTopic: string
  isApproved: boolean
  userProfileImage: UserProfileImageType
}

type UserNodeType = {
  userId: number
  fullName: string
  isBlock: boolean
  isFriend?: boolean | null
  isFollow?: boolean | null
  profileImageLink: string | null
  role: UserRoleType | null
}

type UserShortenedType = {
  userId: number
  fullName: string | null
  linkImage: string | null
}

export type { UserRoleType, UserType, VolunteerType, OrganizationType, UserNodeType, OrganizationNodeType, UserShortenedType }