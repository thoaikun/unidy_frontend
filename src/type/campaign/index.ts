import { PaletteColor } from "@mui/material"
import { UserNodeType, UserTransactionType } from "../user"

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

type CampaignStatusType = 'IN_PROGRESS' | 'COMPLETE' | 'BLOCK'

type CampaignStatusColorType = {
  [key in CampaignStatusType]: {
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success',
    main: keyof PaletteColor
    background: keyof PaletteColor
  }
}

const campaignStatusColor: CampaignStatusColorType = {
  IN_PROGRESS: {
    color: 'info',
    main: 600,
    background: 200,
  },
  COMPLETE: {
    color: 'success',
    main: 600,
    background: 100,
  },
  BLOCK: {
    color: 'error',
    main: 300,
    background: 100,
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
  transactionType: string
  transactionTime: string | null
  transactionAmount: number
  transactionCode: string
  signature: string
  organizationUserId: number
  campaignId: number
  campaign: CampaignTransactionType
  user: UserTransactionType
}

type CampaignHistoryType = {
  userId: number
  campaignId: number
  timeJoin: string
  status: string
  campaign: CampaignTransactionType
}

export { campaignStatusColor, campaignStatusTitle }
export type { CampaignType, TransactionType, CampaignHistoryType }