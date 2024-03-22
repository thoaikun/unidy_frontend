import { UserNodesType } from "../user"

type PostType = {
  postId: string
  content: string
  // hashtag: string[]
  status: string
  createDate: string
  updateDate: string | null
  isBlock: boolean
  linkImage: string
  userNodes: UserNodesType
  isLiked: boolean
  likeCount: number
  // comments?: string[]
  comments?: any[]
  userLikes?: UserNodesType[]
}

export type { PostType }