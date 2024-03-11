import HomeVolunteer from '@/view/dashboard/home/home-volunteer'
import HomeOrganization from '@/view/dashboard/home/home-organization'
import { getCookie } from 'cookies-next'

const HomePage = async () => {
  const role = getCookie('role')

  return (role !== 'ORGANIZATION' ? (
    <HomeVolunteer />
  ) : (
    <HomeOrganization />
  ))
}

export default HomePage