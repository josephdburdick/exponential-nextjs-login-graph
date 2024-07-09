'use client'

import { useAuth } from '../context/AuthContext'

export default function NavMenu() {
  const { user } = useAuth()
  return <nav></nav>
}
