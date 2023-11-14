import { UserType } from "../user"

export type PostType = {
  content?: string
  hashtag?: string[]
  media: string
  loved: boolean
  numberLoved?: number
  numberComments?: number
  activity?: string
  isEvent?: boolean
  created?: UserType
  createdAt?: Date
  updated?: UserType
  updatedAt?: Date
}