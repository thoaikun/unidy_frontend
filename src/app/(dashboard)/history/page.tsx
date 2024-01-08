import JoinedCard from "@/component/joined-card"
import SupportedCard from "@/component/supported-card"
import { Grid, Typography } from "@mui/material"

const supportedHistory = [
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: 0,
    money: '145 triệu đồng',
    time: '20/2/2023 - 3:24PM',
    method: 'Momo',
  },
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: 0,
    money: '145 triệu đồng',
    time: '20/2/2023 - 3:24PM',
    method: 'Momo',
  },
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: 1,
    money: '145 triệu đồng',
    time: '20/2/2023 - 3:24PM',
    method: 'Momo',
  },
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: 0,
    money: '145 triệu đồng',
    time: '20/2/2023 - 3:24PM',
    method: 'Momo',
  },
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: -1,
    money: '145 triệu đồng',
    time: '20/2/2023 - 3:24PM',
    method: 'Momo',
  },
]

const joinedHistory = [
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: 0,
    time: '1/23/2023 - 3.32AM',
    numberVolunteers: 100,
    maxVolunteers: 120,
  },
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: 0,
    time: '1/23/2023 - 3.32AM',
    numberVolunteers: 100,
    maxVolunteers: 120,
  },
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: 0,
    time: '1/23/2023 - 3.32AM',
    numberVolunteers: 100,
    maxVolunteers: 120,
  },
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: 0,
    time: '1/23/2023 - 3.32AM',
    numberVolunteers: 100,
    maxVolunteers: 120,
  },
  {
    media: '/examples/post-media-2.webp',
    title: 'Trồng cây gây rừng',
    status: 0,
    time: '1/23/2023 - 3.32AM',
    numberVolunteers: 100,
    maxVolunteers: 120,
  },
]

const HistoryPage = () => {
  return (
    <>
      {supportedHistory &&
        <>
          <Typography variant='h5' my={2.75}>Lịch sử ủng hộ</Typography>
          <Grid container spacing={3.75} width={860}>
            {supportedHistory.map((item, index) => (
              <Grid item key={index}>
                <SupportedCard data={item} />
              </Grid>
            ))}
          </Grid>
        </>
      }
      {joinedHistory &&
        <>
          <Typography variant='h5' my={2.75}>Lịch sử ủng hộ</Typography>
          <Grid container spacing={3.75} width={860}>
            {joinedHistory.map((item, index) => (
              <Grid item key={index}>
                <JoinedCard data={item} />
              </Grid>
            ))}
          </Grid>
        </>
      }
    </>
  )
}

export default HistoryPage