'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Tab, Tabs } from '@mui/material'

const volunteerSideBar = [
  {
    path: '/home',
    origin: '/images/dashboard/side-bar/home.svg',
    selected: '/images/dashboard/side-bar/home-selected.svg'
  },
  {
    path: '/connections',
    origin: '/images/dashboard/side-bar/connection.svg',
    selected: '/images/dashboard/side-bar/connection-selected.svg'
  },
  {
    path: '/history',
    origin: '/images/dashboard/side-bar/history.svg',
    selected: '/images/dashboard/side-bar/history-selected.svg'
  },
]

const organizationSideBar = [
  {
    path: '/home',
    origin: '/images/dashboard/side-bar/home.svg',
    selected: '/images/dashboard/side-bar/home-selected.svg'
  },
  {
    path: '/history',
    origin: '/images/dashboard/side-bar/campaign-list.svg',
    selected: '/images/dashboard/side-bar/campaign-list-selected.svg'
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
}

interface Props {
  isVolunteer: boolean
}

const SideBar = ({ isVolunteer }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState<number | false>(isVolunteer ? volunteerTabIndex[pathname] : organizationTabIndex[pathname])

  useEffect(() => {
    if (pathname.includes('campaign')) {
      setValue(isVolunteer ? volunteerTabIndex['/history'] : organizationTabIndex['/history'])
    }
    else {
      const temp = isVolunteer ? volunteerTabIndex[pathname] : organizationTabIndex[pathname]
      setValue(temp >= 0 && temp)
    }
  }, [pathname, isVolunteer])

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
      {(isVolunteer ? volunteerSideBar : organizationSideBar).map((item, index) => (
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