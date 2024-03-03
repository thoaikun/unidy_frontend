'use client'

import { useCallback, useState } from 'react'
import { UserRoleType } from '@/type/user'
import UserRole from '@/view/authentication/sign-up/user-role'
import SignUpView from '@/view/authentication/sign-up'

const SignUpPage = () => {
  const [role, setRole] = useState<UserRoleType>()
  const [isConfirm, setIsConfirm] = useState<boolean>(false)

  const handleSelectRole = useCallback((selectedRole: UserRoleType) => () => {
    setRole(selectedRole)
  }, [])

  const handleConfirm = useCallback(() => {
    if (role) {
      setIsConfirm(true)
    }
  }, [role])

  const handleBack = useCallback(() => {
    setRole(undefined)
    setIsConfirm(false)
  }, [])

  if (isConfirm && role) {
    return <SignUpView role={role} handleBackToSelectRole={handleBack} />
  }
  else {
    return <UserRole role={role} handleSelectRole={handleSelectRole} handleSubmit={handleConfirm} />
  }
}

export default SignUpPage