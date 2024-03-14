import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Skeleton, Tab, Tabs } from '@mui/material'
import { useAppSelector } from '@/lib/hook'
import { getCookie } from 'cookies-next'

const volunteerSideBar = [
  {
    path: '/home',
    origin: '/icons/home.svg',
    selected: '/icons/home-selected.svg'
  },
  {
    path: '/connections',
    origin: '/icons/connection.svg',
    selected: '/icons/connection-selected.svg'
  },
  {
    path: '/history',
    origin: '/icons/history.svg',
    selected: '/icons/history-selected.svg'
  },
]

const organizationSideBar = [
  {
    path: '/home',
    origin: '/icons/home.svg',
    selected: '/icons/home-selected.svg'
  },
  {
    path: '/history',
    origin: '/icons/campaign-list.svg',
    selected: '/icons/campaign-list-selected.svg'
  },
  {
    path: '/message',
    origin: '/icons/message.svg',
    selected: '/icons/message.svg'
  },
]

const volunteerTabIndex: {
  [field: string]: number
} = {
  '/home': 0,
  '/connections': 1,
  '/history': 2,
}

const organizationTabIndex: {
  [field: string]: number
} = {
  '/home': 0,
  '/history': 1,
  '/message': 2,
}

const SideBar = () => {
  const role = getCookie('role')
  const isOrganization = role === 'ORGANIZATION'
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState<number>(isOrganization ? organizationTabIndex[pathname] : volunteerTabIndex[pathname])

  useEffect(() => {
    if (pathname.includes('campaign')) {
      setValue(isOrganization ? organizationTabIndex['/history'] : volunteerTabIndex['/history'])
    }
    else if (pathname.includes('/profile')) {
      setValue(-1)
    }
  }, [pathname, isOrganization])

  const handleChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }, [])

  const handleNavigate = useCallback((path: string) => () => {
    router.push(path)
  }, [router])

  return (
    <Tabs
      orientation='vertical'
      value={value}
      onChange={handleChange}
      sx={{ height: 'calc(100% - 64px)', backgroundColor: '#ffffff', position: 'absolute' }}
      TabIndicatorProps={{ sx: { left: 0 } }}
    >
      {(isOrganization ? organizationSideBar : volunteerSideBar).map((item, index) => (
        <Tab
          key={index}
          icon={<Image src={index === value ? item.selected : item.origin} alt='dashboard' width={20} height={20} />}
          sx={{ py: 3, minWidth: 70 }}
          onClick={handleNavigate(item.path)}
        />
      ))}
    </Tabs>
  )
}

export default SideBar