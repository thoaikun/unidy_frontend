import { UserType } from "@/type/user";

const volunteerData: UserType = {
  userId: 1,
  fullName: 'Thoại lê nè',
  address: '',
  phone: '0123456789',
  sex: 'female',
  dayOfBirth: new Date(),
  job: 'student',
  workLocation: 'HCMUT',
  role: 'volunteer',
  image: '/examples/avatar.jpg',
}

const organizationData: UserType = {
  userId: 2,
  fullName: 'International Volunteer HQ',
  address: '',
  phone: '0987654321',
  sex: 'male',
  dayOfBirth: new Date(),
  job: 'charity organization',
  workLocation: 'World',
  role: 'organization',
  image: '/examples/organization-avatar.png',
}

export { volunteerData, organizationData }