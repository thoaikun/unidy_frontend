import { FriendRequestType, RecommendationFriendType, UserNodeType, UserType } from '@/type/user'
import { PostType } from '@/type/post'
import { CampaignHistoryType, CampaignType } from '@/type/campaign'

export const userData: UserType = {
  address: 'Thủ Đức',
  dayOfBirth: '2002-07-10T00:00:00.000+00:00',
  fullName: 'Lê Nguyễn Huyền Thoại',
  image: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/4/733bf142-84a5-4277-b6c2-b0ac0bd18ea8.jpeg',
  job: 'STUDENT',
  phone: '0355770987',
  role: 'VOLUNTEER',
  sex: 'FEMALE',
  userId: 4,
  workLocation: 'BKUE'
}

export const organizationData: UserType = {
  userId: 2,
  fullName: 'International Volunteer HQ',
  address: '',
  phone: '0987654321',
  sex: 'MALE',
  dayOfBirth: '2002-07-10T00:00:00.000+00:00',
  job: 'charity organization',
  workLocation: 'World',
  role: 'ORGANIZATION',
  image: '/examples/organization-avatar.png',
}

export const postsData: PostType[] = [
  {
    postId: '2024-02-03T10:35:47.301741400_5',
    content: 'Trong ánh bình minh ấm áp, chúng tôi khởi đầu hành trình phát cháo từ thiện. Bát cháo không chỉ là thức ăn, mà còn là lá thư tình nguyện, mang theo niềm tin và sự chia sẻ. Trải qua những con đường nhỏ, chúng tôi không chỉ đem lại bữa ăn ấm lòng mà còn xây dựng một cộng đồng đồng lòng, nơi tình người là ngôn ngữ chung. Hành trình này không chỉ là sự chia sẻ thực phẩm mà còn là dịp để tìm kiếm những khoảnh khắc đẹp, làm cho trái tim chúng tôi trở nên giàu có hơn bằng trái tim của mình.',
    status: 'Hạnh phúc',
    createDate: '2024-02-03T10:35:47',
    updateDate: null,
    isBlock: false,
    linkImage: '["https://unidy.s3.ap-southeast-1.amazonaws.com/post-images/5/71641db0-6bfa-4118-a849-e4709ff428bc.jpeg"]',
    userNode: {
      userId: 5,
      fullName: 'Nguyễn Hoàng Bảo Hùng',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/5/a846a438-c802-4de2-b8cd-a6fb32292cbe.jpeg',
      role: null
    },
    isLiked: false,
    likeCount: 0
  },
  {
    postId: '2024-02-03T10:34:29.777128600_5',
    content: 'Hành trình của chúng tôi không chỉ là việc chia sẻ những thứ vật chất, mà còn là dịp để tôi hiểu rõ hơn về những câu chuyện đằng sau những khuôn mặt ẩn sau nụ cười nhẹ nhàng. Những người tình nguyện đồng hành cùng tôi, chúng tôi trải qua những khoảnh khắc gắn kết, tạo nên một đội ngũ vững mạnh, sẵn sàng chia sẻ và giúp đỡ.',
    status: 'Hứng khởi ',
    createDate: '2024-02-03T10:34:29',
    updateDate: null,
    isBlock: false,
    linkImage: '["https://unidy.s3.ap-southeast-1.amazonaws.com/post-images/5/bf2a6d31-7f50-45fc-9da8-4987984e2332.jpeg","https://unidy.s3.ap-southeast-1.amazonaws.com/post-images/5/69360845-934f-43ca-aeee-33ca763a3cff.jpeg"]',
    userNode: {
      userId: 5,
      fullName: 'Nguyễn Hoàng Bảo Hùng',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/5/a846a438-c802-4de2-b8cd-a6fb32292cbe.jpeg',
      role: null
    },
    isLiked: false,
    likeCount: 0
  },
  {
    postId: '2024-02-03T10:30:24.874187600_10',
    content: 'Có người đến có người đi và có người ở lại',
    status: 'Biết ơn',
    createDate: '2024-02-03T10:30:24',
    updateDate: null,
    isBlock: false,
    linkImage: '["https://unidy.s3.ap-southeast-1.amazonaws.com/post-images/10/3790f2b4-d1d4-497a-bad4-a7491aab0f30.png","https://unidy.s3.ap-southeast-1.amazonaws.com/post-images/10/9f09a1a6-88ed-40fc-820b-c4da3b6bf9f6.jpeg"]',
    userNode: {
      userId: 10,
      fullName: 'Trương A',
      isBlock: false,
      profileImageLink: null,
      role: null
    },
    isLiked: false,
    likeCount: 0
  }
]

export const postDetailData: PostType = {
  postId: '2024-02-03T10:35:47.301741400_5',
  content: 'Trong ánh bình minh ấm áp, chúng tôi khởi đầu hành trình phát cháo từ thiện. Bát cháo không chỉ là thức ăn, mà còn là lá thư tình nguyện, mang theo niềm tin và sự chia sẻ. Trải qua những con đường nhỏ, chúng tôi không chỉ đem lại bữa ăn ấm lòng mà còn xây dựng một cộng đồng đồng lòng, nơi tình người là ngôn ngữ chung. Hành trình này không chỉ là sự chia sẻ thực phẩm mà còn là dịp để tìm kiếm những khoảnh khắc đẹp, làm cho trái tim chúng tôi trở nên giàu có hơn bằng trái tim của mình.',
  status: 'Hạnh phúc',
  createDate: '2024-02-03T10:35:47',
  updateDate: null,
  isBlock: false,
  linkImage: '["https://unidy.s3.ap-southeast-1.amazonaws.com/post-images/5/71641db0-6bfa-4118-a849-e4709ff428bc.jpeg"]',
  userLikes: [],
  userNode: {
    userId: 5,
    fullName: 'Nguyễn Hoàng Bảo Hùng',
    isBlock: false,
    profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/5/a846a438-c802-4de2-b8cd-a6fb32292cbe.jpeg',
    role: null
  },
  isLiked: false,
  likeCount: 0
}

export const joinedCardData: CampaignHistoryType[] = [
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

export const campaignsData: CampaignType[] = [
  {
    campaign: {
      campaignId: '4',
      title: 'Mùa hè xanh',
      hashTag: null,
      content: 'Mùa hè xanh',
      status: 'IN_PROGRESS',
      startDate: '2024-02-03T10:30:24',
      endDate: '2024-03-03T10:30:24',
      timeTakePlace: '2024-04-03T10:30:24',
      location: 'Sai Gon',
      numbersVolunteer: 20,
      numOfRegister: 5,
      createDate: null,
      updateDate: null,
      isBlock: false,
      linkImage: null,
      donationBudget: 100000000,
      donationBudgetReceived: 60000000,
      userNode: null,
      donate: null,
      userLikes: []
    },
    organizationNode: {
      userId: 13,
      fullName: 'Organization 1',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/13/786a7539-932a-4844-9fa4-d09456015db9.png',
      role: 'ORGANIZATION'
    },
    likeCount: 0,
    isLiked: false,
    isJoined: false
  },
  {
    campaign: {
      campaignId: '6',
      title: 'Hoa phượng đỏ',
      hashTag: null,
      content: 'Hoa phượng đỏ',
      status: 'IN_PROGRESS',
      startDate: '2024-02-03T10:30:24',
      endDate: '2024-03-03T10:30:24',
      timeTakePlace: '2024-04-03T10:30:24',
      location: 'Sai Gon',
      numbersVolunteer: 20,
      numOfRegister: 5,
      createDate: null,
      updateDate: null,
      isBlock: false,
      linkImage: null,
      donationBudget: 100000000,
      donationBudgetReceived: 60020000,
      userNode: null,
      donate: null,
      userLikes: []
    },
    organizationNode: {
      userId: 13,
      fullName: 'Organization 1',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/13/786a7539-932a-4844-9fa4-d09456015db9.png',
      role: 'ORGANIZATION'
    },
    likeCount: 0,
    isLiked: false,
    isJoined: false
  },
  {
    campaign: {
      campaignId: '7',
      title: 'Kỳ nghỉ hồng',
      hashTag: null,
      content: 'Kỳ nghỉ hồng',
      status: 'IN_PROGRESS',
      startDate: '2024-02-03T10:30:24',
      endDate: '2024-03-03T10:30:24',
      timeTakePlace: '2024-04-03T10:30:24',
      location: 'Sai Gon',
      numbersVolunteer: 20,
      numOfRegister: 5,
      createDate: null,
      updateDate: null,
      isBlock: false,
      linkImage: null,
      donationBudget: 100000000,
      donationBudgetReceived: 60000000,
      userNode: null,
      donate: null,
      userLikes: []
    },
    organizationNode: {
      userId: 13,
      fullName: 'Organization 1',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/13/786a7539-932a-4844-9fa4-d09456015db9.png',
      role: 'ORGANIZATION'
    },
    likeCount: 0,
    isLiked: false,
    isJoined: false
  },
  {
    campaign: {
      campaignId: '9',
      title: 'Hành quân xanh',
      hashTag: null,
      content: 'Hành quân xanh',
      status: 'IN_PROGRESS',
      startDate: '2024-02-03T10:30:24',
      endDate: '2024-03-03T10:30:24',
      timeTakePlace: '2024-04-03T10:30:24',
      location: 'Sai Gon',
      numbersVolunteer: 20,
      numOfRegister: 5,
      createDate: null,
      updateDate: null,
      isBlock: false,
      linkImage: null,
      donationBudget: 100000000,
      donationBudgetReceived: 60200000,
      userNode: null,
      donate: null,
      userLikes: []
    },
    organizationNode: {
      userId: 13,
      fullName: 'Organization 1',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/13/786a7539-932a-4844-9fa4-d09456015db9.png',
      role: 'ORGANIZATION'
    },
    likeCount: 0,
    isLiked: false,
    isJoined: false
  },
  {
    campaign: {
      campaignId: '10',
      title: 'Tình nguyện tại đảo',
      hashTag: null,
      content: 'Tình nguyện tại đảo',
      status: 'IN_PROGRESS',
      startDate: '2024-02-03T10:30:24',
      endDate: '2024-03-03T10:30:24',
      timeTakePlace: '2024-04-03T10:30:24',
      location: 'Sai Gon',
      numbersVolunteer: 20,
      numOfRegister: 5,
      createDate: null,
      updateDate: null,
      isBlock: false,
      linkImage: null,
      donationBudget: 100000000,
      donationBudgetReceived: 60000000,
      userNode: null,
      donate: null,
      userLikes: []
    },
    organizationNode: {
      userId: 13,
      fullName: 'Organization 1',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/13/786a7539-932a-4844-9fa4-d09456015db9.png',
      role: 'ORGANIZATION'
    },
    likeCount: 0,
    isLiked: false,
    isJoined: true
  },
  {
    campaign: {
      campaignId: '2',
      title: 'Vệ sinh khu phố',
      hashTag: null,
      content: 'Vệ sinh khu phố',
      status: 'IN_PROGRESS',
      startDate: '2024-02-03T10:30:24',
      endDate: '2024-03-03T10:30:24',
      timeTakePlace: '2024-04-03T10:30:24',
      location: 'Sai Gon',
      numbersVolunteer: 20,
      numOfRegister: 5,
      createDate: null,
      updateDate: null,
      isBlock: false,
      linkImage: null,
      donationBudget: 100000000,
      donationBudgetReceived: 60000000,
      userNode: null,
      donate: null,
      userLikes: []
    },
    organizationNode: {
      userId: 13,
      fullName: 'Organization 1',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/13/786a7539-932a-4844-9fa4-d09456015db9.png',
      role: 'ORGANIZATION'
    },
    likeCount: 0,
    isLiked: false,
    isJoined: false
  },
  {
    campaign: {
      campaignId: '3',
      title: 'Tuyên truyền phòng chống sốt rét',
      hashTag: null,
      content: 'Tuyên truyền phòng chống sốt rét',
      status: 'IN_PROGRESS',
      startDate: '2024-02-03T10:30:24',
      endDate: '2024-03-03T10:30:24',
      timeTakePlace: '2024-04-03T10:30:24',
      location: 'Sai Gon',
      numbersVolunteer: 20,
      numOfRegister: 5,
      createDate: null,
      updateDate: null,
      isBlock: false,
      linkImage: null,
      donationBudget: 100000000,
      donationBudgetReceived: 60000000,
      userNode: null,
      donate: null,
      userLikes: []
    },
    organizationNode: {
      userId: 13,
      fullName: 'Organization 1',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/13/786a7539-932a-4844-9fa4-d09456015db9.png',
      role: 'ORGANIZATION'
    },
    likeCount: 0,
    isLiked: false,
    isJoined: false
  },
  {
    campaign: {
      campaignId: '4',
      title: 'Mùa hè xanh',
      hashTag: null,
      content: 'Mùa hè xanh',
      status: 'IN_PROGRESS',
      startDate: '2024-02-03T10:30:24',
      endDate: '2024-03-03T10:30:24',
      timeTakePlace: '2024-04-03T10:30:24',
      location: 'Sai Gon',
      numbersVolunteer: 20,
      numOfRegister: 5,
      createDate: null,
      updateDate: null,
      isBlock: false,
      linkImage: null,
      donationBudget: 100000000,
      donationBudgetReceived: 60000000,
      userNode: null,
      donate: null,
      userLikes: []
    },
    organizationNode: {
      userId: 13,
      fullName: 'Organization 1',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/13/786a7539-932a-4844-9fa4-d09456015db9.png',
      role: 'ORGANIZATION'
    },
    likeCount: 0,
    isLiked: false,
    isJoined: false
  },
  {
    campaign: {
      campaignId: '5',
      title: 'Xuân tình nguyện',
      hashTag: null,
      content: 'Xuân tình nguyện',
      status: 'IN_PROGRESS',
      startDate: '2024-02-03T10:30:24',
      endDate: '2024-03-03T10:30:24',
      timeTakePlace: '2024-04-03T10:30:24',
      location: 'Sai Gon',
      numbersVolunteer: 20,
      numOfRegister: 5,
      createDate: null,
      updateDate: null,
      isBlock: false,
      linkImage: null,
      donationBudget: 100000000,
      donationBudgetReceived: 60000000,
      userNode: null,
      donate: null,
      userLikes: []
    },
    organizationNode: {
      userId: 13,
      fullName: 'Organization 1',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/13/786a7539-932a-4844-9fa4-d09456015db9.png',
      role: 'ORGANIZATION'
    },
    likeCount: 0,
    isLiked: false,
    isJoined: false
  },
  {
    campaign: {
      campaignId: '1',
      title: 'Phát cháo',
      hashTag: null,
      content: 'Phát cháo',
      status: 'IN_PROGRESS',
      startDate: '2024-02-03T10:30:24',
      endDate: '2024-03-03T10:30:24',
      timeTakePlace: '2024-04-03T10:30:24',
      location: 'Sai Gon',
      numbersVolunteer: 20,
      numOfRegister: 5,
      createDate: null,
      updateDate: null,
      isBlock: false,
      linkImage: null,
      donationBudget: 100000000,
      donationBudgetReceived: 60200000,
      userNode: null,
      donate: null,
      userLikes: []
    },
    organizationNode: {
      userId: 13,
      fullName: 'Organization 1',
      isBlock: false,
      profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/13/786a7539-932a-4844-9fa4-d09456015db9.png',
      role: 'ORGANIZATION'
    },
    likeCount: 0,
    isLiked: false,
    isJoined: false
  }
]

export const friendsData: UserNodeType[] = [
  {
    userId: 5,
    fullName: 'Nguyễn Hoàng Bảo Hùng',
    isBlock: false,
    profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/5/a846a438-c802-4de2-b8cd-a6fb32292cbe.jpeg',
    role: null
  },
  {
    userId: 10,
    fullName: 'Trương A',
    isBlock: false,
    profileImageLink: null,
    role: null
  },
  {
    userId: 11,
    fullName: 'Johny Nguyễn',
    isBlock: false,
    profileImageLink: null,
    role: null
  },
  {
    userId: 15,
    fullName: 'Lê Nguyễn Huyền Thoại',
    isBlock: false,
    profileImageLink: null,
    role: null
  }
]

export const friendRequestsData: FriendRequestType[] = [
  {
    userRequest: {
      userId: 3,
      fullName: "Trương Huy Thái",
      isBlock: false,
      profileImageLink: null,
      role: null
    },
    requestAt: "2024-03-28T12:49:57"
  }
]

export const recommendationFriendsData: RecommendationFriendType[] = [
  {
    fiendSuggest: {
      userId: 16,
      fullName: "Lê Nguyễn Huyền Thoại",
      isBlock: false,
      profileImageLink: null,
      role: null
    },
    numOfMutualFriend: 1,
    mutualFriends: [
      {
        userId: 3,
        fullName: "Trương Huy Thái",
        isBlock: false,
        profileImageLink: null,
        role: null
      }
    ]
  }
]