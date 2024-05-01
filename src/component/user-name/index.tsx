import { UserRoleType } from "@/type/user"
import { Typography, TypographyProps } from "@mui/material"
import Link from "next/link"

interface Props {
  data: {
    userId: number
    fullName: string | null
    role: UserRoleType | null
  }
  typographyProps?: TypographyProps
  onClick?: () => void
}

const UserName = ({ data: { userId, fullName, role }, typographyProps, onClick }: Props) => {
  return (
    <Link href={`/${role !== 'ORGANIZATION' ? 'volunteers' : 'organizations'}/${userId}`} onClick={onClick}>
      <Typography sx={{ ':hover': { textDecoration: 'underline' } }} {...typographyProps}>
        {fullName}
      </Typography>
    </Link>
  )
}

export default UserName