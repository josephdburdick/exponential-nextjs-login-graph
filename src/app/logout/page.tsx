'use client'

import { useAuth } from '@/components/context/AuthContext'
import { useEffect } from 'react'

export default function Logout() {
  const { logout } = useAuth()
  useEffect(() => logout(), [])
  return <></>
}
