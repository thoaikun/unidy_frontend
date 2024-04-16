import { theme } from "@/component/theme"
import { UserNodeType, UserShortenedType } from "../user"

type CampaignStatusType = 'IN_PROGRESS' | 'COMPLETE' | 'BLOCK'

type CampaignDetailType = {
  campaignId: string
  title: string
  hashTag: string | null
  content: string
  status: CampaignStatusType
  startDate: string
  endDate: string
  timeTakePlace: string
  location: string
  numbersVolunteer: number
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
  isJoined: boolean | null
}

type CampaignStatusColorType = {
  [key in CampaignStatusType]: {
    background: string
    color: string
  }
}

const campaignStatusColor: CampaignStatusColorType = {
  IN_PROGRESS: {
    background: theme.palette.info[200],
    color: theme.palette.info[600],
  },
  COMPLETE: {
    background: theme.palette.success[100],
    color: theme.palette.success[600],
  },
  BLOCK: {
    background: theme.palette.error[100],
    color: theme.palette.error[300],
  },
}

const campaignStatusTitle: { [key in CampaignStatusType]: string } = {
  IN_PROGRESS: 'Đang diễn ra',
  COMPLETE: 'Đã kết thúc',
  BLOCK: 'Đã hủy'
}

type CampaignTransactionType = {
  campaignId: number
  title: string
  description: string
  categories: null
  numberVolunteer: number
  numberVolunteerRegistered: number
  donationBudget: number
  donationBudgetReceived: number
  startDate: string
  endDate: string
  timeTakePlace: null
  location: string
  status: CampaignStatusType
  createDate: string | null
  updateDate: string | null
  updateBy: null
  owner: number
  hashTag: null
  link_image: string | null
}

type TransactionType = {
  transactionId: number
  transactionType: string | null
  transactionTime: string | null
  transactionAmount: number
  transactionCode: string | null
  signature: string | null
  organizationUserId: number
  campaignId: number
  campaign: CampaignTransactionType | null
  user: UserShortenedType
}

type CampaignHistoryType = {
  userId: number
  campaignId: number
  timeJoin: string
  status: string
  campaign: CampaignTransactionType
}

type CertificateType = {
  certificateId: number
  campaignId: number
  campaignName: string
  organizationId: number
  organizationName: string
  certificateLink: string
}

export { campaignStatusColor, campaignStatusTitle }
export type { CampaignDetailType, CampaignType, TransactionType, CampaignHistoryType, CertificateType }