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

type UserShortenedType = {
  userId: number
  fullName: string | null
  linkImage: string | null
}

export type { UserRoleType, UserType, OrganizationType, UserNodeType, UserShortenedType }