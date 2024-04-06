import { UserShortenedType } from "../user"

type NotificationTypeType = 'FRIEND_REQUEST' | 'FRIEND_ACCEPT' | 'NEW_CAMPAIGN' | 'CAMPAIGN_END'

type NotificationType = {
  notificationId: number
  title: string
  description: string
  createdTime: string
  seenTime: string | null
  type: NotificationTypeType
  extra: {
    id: string
  }
  receiver: number
  owner: UserShortenedType
}

export type { NotificationType }