import { CheckCircleOutline } from "@mui/icons-material"
import { Box, Button, Container, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

interface Props {
  searchParams: {
    orderId: string
  }
}

const Donation = ({ searchParams: { orderId } }: Props) => {
  return (
    <Container sx={{ height: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Image src='images/logo-big.svg' alt='logo' width={200} height={60} style={{ marginBottom: 40 }} />

      <CheckCircleOutline sx={{ width: 100, height: 100 }} color='success' />

      <Typography variant='h1' align='center' my={4}>
        Chúc mừng! Bạn đã hoàn thành giao dịch <span style={{ color: '#537ee4' }}>#{orderId}</span>
      </Typography>

      <Link href='/home'>
        <Button variant='contained'>Về trang chủ</Button>
      </Link>
    </Container>
  )
}

export default Donation