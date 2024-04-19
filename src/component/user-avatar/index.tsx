import { UserNodeType } from "@/type/user"
import { Avatar, AvatarProps } from "@mui/material"
import Link from "next/link"

interface Props {
  data: UserNodeType
  avatarProps?: AvatarProps
  onClick?: () => void
}

const UserAvatar = ({ data: { userId, profileImageLink, role }, avatarProps, onClick }: Props) => {
  return (
    <Link href={`/${role !== 'ORGANIZATION' ? 'volunteers' : 'organizations'}/${userId}`} onClick={onClick}>
      <Avatar src={profileImageLink || ''}  {...avatarProps} />
    </Link>
  )
}

export default UserAvatar