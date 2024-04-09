import ImageIcon from "@mui/icons-material/Image"
import { Button, Typography } from "@mui/material"
import { ChangeEvent, useCallback, useRef } from "react"

interface Props {
  onUploadImage: (file: File) => void
}

const UploadImage = ({ onUploadImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      onUploadImage(event.target.files[0])
    }
  }, [onUploadImage])

  return (
    <>
      <input type='file' accept='image/*' style={{ display: 'none' }} ref={inputRef} onChange={handleInputChange} />
      <Button
        variant='outlined'
        sx={{
          width: 200,
          height: 200,
          flexDirection: 'column',
          backgroundColor: '#FAFAFA',
          borderRadius: 2,
          borderWidth: 3,
        }}
        onClick={handleClick}
      >
        <ImageIcon />
        <Typography>Tải ảnh lên</Typography>
      </Button>
    </>
  )
}

export default UploadImage