import { UserNodesType } from "../user"


export type PostType = {
  postId: string
  content: string
  hashtag: string[]
  status: string
  createDate: Date
  updateDate: Date
  isBlock: boolean
  linkImage: string
  userNodes: UserNodesType
  isLiked: boolean
  likeCount: number
  // comments?: string[]
  comments?: any[]
  isEvent?: boolean
}