import HomeVolunteer from '@/view/dashboard/home/home-volunteer'
import HomeOrganization from '@/view/dashboard/home/home-organization'
import { cookies } from 'next/headers'

const HomePage = () => {
  const cookieStore = cookies()
  const role = cookieStore.get('role')

  return (role?.value !== 'ORGANIZATION' ? (
    <HomeVolunteer />
  ) : (
    <HomeOrganization />
  ))
}

export default HomePage