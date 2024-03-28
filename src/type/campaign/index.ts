import { UserNodeType } from "../user"

type CampaignDetailType = {
  campaignId: string
  title: string
  hashTag: string[] | null
  content: string
  status: string
  startDate: string
  endDate: string
  timeTakePlace: string
  location: string
  numOfRegister: number
  createDate: string | null
  updateDate: string | null
  isBlock: boolean
  linkImage: string | null
  donationBudget: number
  donationBudgetReceived: number
  userNode: UserNodeType | null
  donate: string | null
  userLikes: UserNodeType[]
}

type CampaignType = {
  campaign: CampaignDetailType
  organizationNode: UserNodeType
  likeCount: number
  isLiked: boolean
  isJoined: boolean
}

export type { CampaignType }