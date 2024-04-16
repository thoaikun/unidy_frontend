import { UserNodeType } from "@/type/user"
import { Avatar, AvatarProps } from "@mui/material"
import Link from "next/link"

interface Props {
  data: UserNodeType
  sx?: AvatarProps
}

const UserAvatar = ({ data: { userId, profileImageLink, role }, sx }: Props) => {
  return (
    <Link href={`/${role !== 'ORGANIZATION' ? 'volunteers' : 'organizations'}/${userId}`}>
      <Avatar src={profileImageLink || ''} sx={{ width: 45, height: 45 }} {...sx} />
    </Link>
  )
}

export default UserAvatar