import { Box, Skeleton, Typography } from "@mui/material"

interface Props {
  size: number
  thickness: number
}

const CustomCircularProgressLoading = ({ size, thickness }: Props) => {
  return (
    <Box position='relative'>
      <Skeleton variant='circular' width={125} height={125} animation='wave' />
      <Box
        width={size - thickness * 6}
        height={size - thickness * 6}
        borderRadius={thickness * 2}
        position='absolute'
        top='50%'
        left='50%'
        sx={{ backgroundColor: '#ffffff', transform: 'translate(-50%, -50%)' }}
      />
      <Typography
        fontSize={size / 5}
        fontWeight={700}
        position='absolute'
        top='50%'
        left='50%'
        sx={{ transform: 'translate(-50%, -50%)' }}
      >
        <Skeleton width={size / 3} animation='wave' />
      </Typography>
    </Box>
  )
}

export default CustomCircularProgressLoading