import { Backdrop, CircularProgress } from "@mui/material"

const CustomBackdrop = () => {
  return (
    <Backdrop open={true} sx={{ zIndex: 9999 }}>
      <CircularProgress />
    </Backdrop>
  )
}

export default CustomBackdrop