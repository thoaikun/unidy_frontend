import { UserNodeType } from "../user"

type CommentType = {
  user: UserNodeType
  comment: {
    commentId: number
    body: string
    postNode: null
    campaignNode: null
    replyComment: null
    userComment: null
  }
  haveReply: boolean
}

export type { CommentType }