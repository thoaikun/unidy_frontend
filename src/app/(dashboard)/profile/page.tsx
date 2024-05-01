import ProfileView from '@/view/dashboard/profile'
import { cookies } from 'next/headers'

const ProfilePage = () => {
  const cookieStore = cookies()
  const isVolunteer = cookieStore.get('role')?.value !== 'ORGANIZATION'

  return (
    <ProfileView isVolunteer={isVolunteer} />
  )
}

export default ProfilePage