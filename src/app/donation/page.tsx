import { CheckCircleOutline } from "@mui/icons-material"
import { Box, Container, Typography } from "@mui/material"
import Image from "next/image"

interface Props {
  searchParams: {
    orderId: string
  }
}

const Donation = ({ searchParams: { orderId } }: Props) => {
  return (
    <Container sx={{ height: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Image src='images/logo-big.svg' alt='logo' width={200} height={60} style={{ marginBottom: 40 }} />
      <CheckCircleOutline sx={{ width: 100, height: 100, mb: 4 }} color='success' />
      <Typography variant='h3' align='center'>
        Chúc mừng! Bạn đã hoàn thành giao dịch <span style={{ color: '#537ee4' }}>#{orderId}</span>
      </Typography>
    </Container>
  )
}

export default Donation