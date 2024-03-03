import { PostType } from "@/type/post";

const postData: PostType[] = [
  {
    postId: '1',
    content: 'Làm là phải làm hết mình, làm tới chết, oke chưa',
    hashtag: ['dieforone'],
    status: 'Đang cảm thấy hứng thú',
    createDate: new Date(),
    updateDate: new Date(),
    isBlock: false,
    linkImage: '/examples/home-post-1.png',
    userNodes: {
      userId: 1,
      fullName: 'Thoại Lê Nè',
      isBlock: false,
      profileImageLink: '/examples/avatar.jpg',
    },
    isLiked: true,
    likeCount: 4,
    comments: new Array(10).fill('an example comment'),
    isEvent: false,
  },
  {
    postId: '2',
    content: `Giúp đỡ những đứa trẻ bệnh tim bằng những hành động nhỏ bé, tham gia ngay để tìm thấy những điều hạnh phúc nhỏ bé
              Đừng ngần ngại !!!! Đăng ký ngay`,
    hashtag: ['dieforone'],
    status: 'Tổ chức sự kiện mới',
    createDate: new Date(),
    updateDate: new Date(),
    isBlock: false,
    linkImage: '/examples/post-media-2.webp',
    userNodes: {
      userId: 2,
      fullName: 'Unicef',
      isBlock: false,
      profileImageLink: '/examples/unicef.png',
    },
    isLiked: false,
    likeCount: 4,
    comments: new Array(10).fill('an example comment'),
    isEvent: true,
  },
]

const postDetailData: PostType = {
  postId: '1',
  content: "There are only three ways to make this work. The first is to let me take care of everything. The second is for you to take care of everything. The third is to split everything 50 / 50. I think the last option is the most preferable, but I'm certain it'll also mean the end of our marriage.",
  hashtag: ['dieforone', 'Volunteee'],
  status: 'Đang cảm thấy hứng thú',
  createDate: new Date(),
  updateDate: new Date(),
  isBlock: false,
  linkImage: '/examples/post-detail.png',
  userNodes: {
    userId: 1,
    fullName: 'Thoại Lê Nè',
    isBlock: false,
    profileImageLink: '/examples/avatar.jpg',
  },
  isLiked: true,
  likeCount: 4,
  comments: [
    {
      content: 'Tới lúc òiiiiiii',
      userNodes: {
        userId: 1,
        fullName: 'Thoại Lê Nè',
        isBlock: false,
        profileImageLink: '/examples/avatar.jpg',
      },
    },
    {
      content: 'Mình có mặt lúc 7h nha bạn.',
      userNodes: {
        userId: 1,
        fullName: 'Thoại Lê Nè',
        isBlock: false,
        profileImageLink: '/examples/avatar.jpg',
      },
    },
    {
      content: 'Mình có mặt lúc 7h nha bạn.',
      userNodes: {
        userId: 1,
        fullName: 'Thoại Lê Nè',
        isBlock: false,
        profileImageLink: '/examples/avatar.jpg',
      },
    },
    {
      content: 'Mình có mặt lúc 7h nha bạn.',
      userNodes: {
        userId: 1,
        fullName: 'Thoại Lê Nè',
        isBlock: false,
        profileImageLink: '/examples/avatar.jpg',
      },
    },
  ],
  isEvent: false,
}

export { postData, postDetailData }