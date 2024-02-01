type UserType = {
  userId: number
  fullName: string
  address: string
  phone: string
  sex: 'female' | 'male'
  dayOfBirth: Date
  job: string
  workLocation: string
  role: string
  image: string
}

type UserNodesType = {
  userId: number
  fullName: string
  isBlock: boolean
  profileImageLink: string
}

type FriendType = UserNodesType & {
  trophy: string
  color: string
}

export type { UserType, UserNodesType, FriendType }