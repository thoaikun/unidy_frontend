import { UserNodeType } from "../user"

type PostType = {
  postId: string
  content: string
  status: string
  createDate: string
  updateDate: string | null
  linkImage: string
  userNode: UserNodeType
  isBlock: boolean
  isLiked: boolean
  likeCount: number
  numberComments: number
}

export type { PostType }