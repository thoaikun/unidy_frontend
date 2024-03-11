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

type UserNodesType = {
  userId: number
  fullName: string
  isBlock: boolean
  profileImageLink: string | null
  role: UserRoleType | null
}

type FriendType = UserNodesType & {
  trophy: string
  color: string
}

export type { UserRoleType, UserType, UserNodesType, FriendType }