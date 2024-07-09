'use client'

import ROUTES from '@/lib/constants/routes'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useWindowSize } from '@uidotdev/usehooks'
const MOBILE = 768

export default function NavMenu() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const size = useWindowSize()

  const isMobile = size.width && size.width < MOBILE

  const links = [
    ROUTES.home,
    user && ROUTES.dashboard,
    user ? ROUTES.logout : ROUTES.login,
  ].filter(Boolean)

  const renderLinks = links.map((link) => (
    <li key={link.path}>
      <Link href={link.path} onClick={() => setOpen(false)}>
        {link.label}
      </Link>
    </li>
  ))

  const mobileClassNames = cn(
    'fixed left-0 right-0 bg-blue-300',
    open ? 'h-full' : 'h-0',
  )
  const Menu = () => (
    <ul
      className={cn(
        isMobile && mobileClassNames,
        'transition-height absolute top-0 overflow-hidden duration-500 sm:inset-x-auto sm:top-0 sm:w-full',
      )}
    >
      <div
        className={cn(
          'flex justify-center gap-8 py-8',
          isMobile &&
            'ani flex h-full flex-col items-center justify-center gap-12 text-3xl',
        )}
      >
        {renderLinks}
      </div>
    </ul>
  )

  return (
    <nav>
      <Menu />
      <Button
        variant={'default'}
        className={cn('fixed bottom-5 right-5 rounded-full p-9 sm:hidden')}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close' : 'Open'} Nav
      </Button>
    </nav>
  )
}
