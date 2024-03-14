import { UserType } from "@/type/user";
import { CustomPostType, PostType } from "@/type/post";

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
    userNodes: {
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
    userNodes: {
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
    userNodes: {
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

export const postDetailData: CustomPostType = {
  postId: '2024-02-03T10:35:47.301741400_5',
  content: 'Trong ánh bình minh ấm áp, chúng tôi khởi đầu hành trình phát cháo từ thiện. Bát cháo không chỉ là thức ăn, mà còn là lá thư tình nguyện, mang theo niềm tin và sự chia sẻ. Trải qua những con đường nhỏ, chúng tôi không chỉ đem lại bữa ăn ấm lòng mà còn xây dựng một cộng đồng đồng lòng, nơi tình người là ngôn ngữ chung. Hành trình này không chỉ là sự chia sẻ thực phẩm mà còn là dịp để tìm kiếm những khoảnh khắc đẹp, làm cho trái tim chúng tôi trở nên giàu có hơn bằng trái tim của mình.',
  status: 'Hạnh phúc',
  createDate: '2024-02-03T10:35:47',
  updateDate: null,
  isBlock: false,
  linkImage: '["https://unidy.s3.ap-southeast-1.amazonaws.com/post-images/5/71641db0-6bfa-4118-a849-e4709ff428bc.jpeg"]',
  userLikes: [],
  userNodes: {
    userId: 5,
    fullName: 'Nguyễn Hoàng Bảo Hùng',
    isBlock: false,
    profileImageLink: 'https://unidy.s3.ap-southeast-1.amazonaws.com/profile-images/5/a846a438-c802-4de2-b8cd-a6fb32292cbe.jpeg',
    role: null
  },
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