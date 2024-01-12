'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Tab, Tabs } from '@mui/material'

const data = [
  {
    path: '/home',
    origin: '/icons/home.svg',
    selected: '/icons/home-selected.svg'
  },
  {
    path: '/connection',
    origin: '/icons/connection.svg',
    selected: '/icons/connection-selected.svg'
  },
  {
    path: '/history',
    origin: '/icons/history.svg',
    selected: '/icons/history-selected.svg'
  },
]

const tabIndex: {
  [field: string]: number
} = {
  '/home': 0,
  '/connection': 1,
  '/history': 2,
}

const SideBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState<number>(tabIndex[pathname])

  useEffect(() => {
    if (pathname.includes('campaign')) {
      setValue(2)
    }
    else if (pathname === '/profile') {
      setValue(-1)
    }
  }, [pathname])

  const handleChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      {data.map((item, index) => (
        <Tab
          key={index}
          icon={<Image src={index === value ? item.selected : item.origin} alt='dashboard' width={25} height={25} />}
          sx={{ my: 2, minWidth: 70 }}
          onClick={handleNavigate(item.path)}
        />
      ))}
    </Tabs>
  )
}

export default SideBar