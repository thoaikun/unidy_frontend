import { CircularProgress, CircularProgressProps, Grid, Typography } from "@mui/material"
import { theme } from "../theme"

const CustomCircularProgress = (props: CircularProgressProps) => {
  return (
    <Grid container position='relative'>
      <CircularProgress
        {...props}
        variant='determinate'
        value={100}
        sx={{ color: theme.palette[(!props.color || props.color === 'inherit') ? 'primary' : props.color][200] }}
      />
      <CircularProgress
        {...props}
        variant='determinate'
        sx={{ position: 'absolute', left: 0, color: theme.palette[(!props.color || props.color === 'inherit') ? 'primary' : props.color][600] }}
      />
      <Typography
        color={theme.palette[(!props.color || props.color === 'inherit') ? 'primary' : props.color].dark}
        fontSize={(props.size as number) / 5}
        fontWeight={700}
        position='absolute'
        top='50%'
        left='50%'
        sx={{ transform: 'translate(-50%, -50%)' }}
      >
        {props.title}
      </Typography>
    </Grid >
  )
}

export default CustomCircularProgress