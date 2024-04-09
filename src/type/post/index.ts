import { UserNodeType } from "../user"

type PostType = {
  postId: string
  content: string
  // hashtag: string[]
  status: string
  createDate: string
  updateDate: string | null
  isBlock: boolean
  linkImage: string
  userNode: UserNodeType
  isLiked: boolean
  likeCount: number
}

export type { PostType }