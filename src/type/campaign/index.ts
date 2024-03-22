import { UserNodesType } from "../user"

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
  userNode: UserNodesType | null
  donate: string | null
  userLikes: UserNodesType[]
}

type CampaignType = {
  campaign: CampaignDetailType
  organizationNode: UserNodesType
  likeCount: number
  isLiked: boolean
  isJoined: boolean
}

export type { CampaignType }