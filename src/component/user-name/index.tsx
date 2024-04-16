import { UserNodeType } from "@/type/user"
import { Typography, TypographyProps } from "@mui/material"
import Link from "next/link"

interface Props {
  data: UserNodeType
  sx?: TypographyProps
}

const UserName = ({ data: { userId, fullName, role }, sx }: Props) => {
  return (
    <Link href={`/${role !== 'ORGANIZATION' ? 'volunteers' : 'organizations'}/${userId}`}>
      <Typography sx={{ ':hover': { textDecoration: 'underline' } }} {...sx}>
        {fullName}
      </Typography>
    </Link>
  )
}

export default UserName