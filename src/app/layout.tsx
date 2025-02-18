import type { Metadata } from 'next'
import { Readex_Pro } from 'next/font/google'
import './globals.css'
import CustomThemeProvider from '@/component/theme'
import ModalProvider from '@/view/modals'
import StoreProvider from './StoreProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const readexPro = Readex_Pro({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Unidy',
  description: 'Nền tảng quản lý và kết nối các hoạt động thiện nguyện',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={readexPro.className}>
        <StoreProvider>
          <CustomThemeProvider options={{ key: 'mui' }}>
            <ModalProvider />
            {children}
          </CustomThemeProvider>
        </StoreProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
