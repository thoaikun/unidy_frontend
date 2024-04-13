import { useCallback, useState } from "react"
import { theme } from "../theme"
import { Typography, TypographyProps } from "@mui/material"

interface Props extends TypographyProps {
  text: string
  limit?: number
}

const EllipsisText = ({ text, limit = 200, ...props }: Props) => {
  const [isFull, setIsFull] = useState<boolean>(false)
  const [isHover, setIsHover] = useState<boolean>(false)

  const handleExpand = useCallback(() => {
    setIsFull(true)
  }, [])

  const handleMouseEvent = useCallback(() => {
    setIsHover((state) => !state)
  }, [])

  if (text.length > limit && !isFull) {
    return (
      <Typography {...props}>
        {text.substring(0, limit)}
        ... <span
          style={{
            color: theme.palette.primary.main,
            cursor: 'pointer',
            textDecoration: isHover ? 'underline' : undefined
          }}
          onMouseEnter={handleMouseEvent}
          onMouseLeave={handleMouseEvent}
          onClick={handleExpand}
        >
          Xem thêm
        </span>
      </Typography>
    )
  } else {
    return (
      <Typography {...props}>
        {text}
      </Typography>
    )
  }
}

export default EllipsisText