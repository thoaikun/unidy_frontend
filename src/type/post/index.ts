import { UserNodesType } from "../user"


export type PostType = {
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
  isEvent?: boolean
}

export type CustomPostType = PostType & {
  userNode: UserNodesType
  userLikes: UserNodesType[]
}