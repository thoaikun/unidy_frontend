import { useAppSelector } from "@/lib/hook"
import { Avatar, BottomNavigation, BottomNavigationAction, Skeleton } from "@mui/material"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useState } from "react"

const volunteerBottomNavigation = [
  {
    label: 'Bảng tin',
    path: '/home',
    origin: '/images/dashboard/side-bar/home.svg',
    selected: '/images/dashboard/side-bar/home-selected.svg',
  },
  {
    label: 'Bạn bè',
    path: '/connections',
    origin: '/images/dashboard/side-bar/connection.svg',
    selected: '/images/dashboard/side-bar/connection-selected.svg',
  },
  {
    label: 'Thêm bài đăng',
    path: '/posts',
    origin: '/images/dashboard/bottom-navigation/plus.svg',
    selected: '/images/dashboard/bottom-navigation/plus-selected.svg',
  },
  {
    label: 'Lịch sử',
    path: '/history',
    origin: '/images/dashboard/side-bar/history.svg',
    selected: '/images/dashboard/side-bar/history-selected.svg',
  },
  {
    label: 'Cá nhân',
    path: '/profile',
    origin: '',
    selected: '',
  },
]

const CustomBottomNavigation = () => {
  const { user, status } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState<string>(pathname)

  const handleChange = useCallback((_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    router.push(newValue)
  }, [router])

  return (
    <BottomNavigation
      showLabels
      sx={{ position: 'fixed', bottom: 0, left: 0, width: 1, height: 64, display: { xs: 'flex', md: 'none' } }}
      value={value}
      onChange={handleChange}
    >
      {volunteerBottomNavigation.map((item) => (
        <BottomNavigationAction
          key={item.path}
          label={item.label}
          value={item.path}
          icon={(() => {
            if (item.path !== '/profile') {
              return <Image src={value !== item.path ? item.origin : item.selected} alt='dashboard' width={20} height={20} />
            }
            else {
              if (status !== 'succeeded') {
                return <Skeleton variant='circular' width={30} height={30} animation='wave' />
              }
              else {
                return <Avatar src={user?.image} sx={{ width: 30, height: 30 }} />
              }
            }
          })()}
        />
      ))}
    </BottomNavigation>
  )
}

export default CustomBottomNavigation