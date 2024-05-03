import { CampaignHistoryType } from '@/type/campaign'


const joinedCardData: CampaignHistoryType[] = [
  {
    userId: 4,
    campaignId: 5,
    timeJoin: "2024-03-23T00:00:00.000+00:00",
    status: "APPROVE",
    campaign: {
      campaignId: 5,
      title: "Xuân tình nguyện",
      description: "Xuân tình nguyện",
      categories: null,
      numberVolunteer: 10,
      numberVolunteerRegistered: 1,
      donationBudget: 20000000,
      donationBudgetReceived: 10000000,
      startDate: "2023-01-23T00:00:00.000+00:00",
      endDate: "2023-02-23T00:00:00.000+00:00",
      timeTakePlace: null,
      location: "sai gon",
      status: "COMPLETE",
      createDate: "2023-01-22",
      updateDate: null,
      updateBy: null,
      owner: 13,
      hashTag: null,
      link_image: null
    }
  }
]

export { joinedCardData }