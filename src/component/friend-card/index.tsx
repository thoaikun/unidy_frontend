import { Avatar, Card, CardHeader, Typography } from "@mui/material"
import Link from "next/link"
import { ReactNode } from "react"

interface Props {
  userId: number
  avatar: string | null
  name: string
  information?: ReactNode
  action: ReactNode
}

const FriendCard = ({ userId, avatar, name, information, action }: Props) => {
  return (
    <Card sx={{ p: 0.5 }}>
      <CardHeader
        avatar={
          <Link href={`/profile/${userId}`}>
            <Avatar src={avatar || ''} sx={{ width: 45, height: 45 }} />
          </Link>
        }
        title={
          <Typography sx={{ ':hover': { textDecoration: 'underline' } }}>
            <Link href={`/profile/${userId}`}>{name}</Link>
          </Typography>
        }
        subheader={information}
        action={action}
      />
    </Card>
  )
}

export default FriendCard