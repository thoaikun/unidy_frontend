import { Close } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"
import Image from "next/image"

interface Props {
  file: File
  onRemove: () => void
}

const ImagePreview = ({ file, onRemove }: Props) => {
  return (
    <Box position='relative'>
      <Image
        src={URL.createObjectURL(file)}
        alt='image'
        width={200}
        height={200}
        style={{ objectFit: 'contain', backgroundColor: '#FAFAFA' }}
      />
      <IconButton
        sx={{ position: 'absolute', right: 0 }}
        onClick={onRemove}
      >
        <Close />
      </IconButton>
    </Box>
  )
}

export default ImagePreview