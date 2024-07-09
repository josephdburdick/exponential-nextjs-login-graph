"use client"

import ROUTES from "@/lib/constants/routes"
import { cn } from "@/lib/utils"
import { useWindowSize } from "@uidotdev/usehooks"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { useAuth } from "../context/AuthContext"
import { Button } from "../ui/button"

const MOBILE = 768

const Menu = ({
  open,
  isMobile,
  renderLinks,
}: {
  open: boolean
  isMobile: boolean
  renderLinks: React.ReactNode
}) => {
  const mobileClassNames = cn(
    "fixed z-40 left-0 right-0 bg-primary text-primary-foreground",
    open ? "h-full" : "h-0",
  )

  return (
    <ul
      className={cn(
        "sticky top-0 overflow-hidden transition-all duration-500 sm:inset-x-auto sm:top-0 sm:w-full",
        isMobile && mobileClassNames,
      )}
    >
      <div
        className={cn(
          "flex justify-center gap-8 py-8",
          isMobile &&
            "flex h-full flex-col items-center justify-center gap-12 text-3xl",
        )}
      >
        {renderLinks}
      </div>
    </ul>
  )
}
export default function NavMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const { width } = useWindowSize()
  const isMobile = Boolean(width && width < MOBILE)

  const links = [
    ...(!user ? [ROUTES.home] : []),
    ...(user ? [ROUTES.dashboard] : []),
    user ? ROUTES.logout : ROUTES.login,
  ].filter(Boolean)

  const renderLinks = links.map((link) => {
    const isActive = link.path === pathname

    return (
      <li
        key={link.path}
        className={cn(isMobile && "flex w-full justify-center")}
      >
        <Link
          href={link.path}
          onClick={() => setOpen(false)}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground",
            isMobile
              ? "w-full px-4 py-6 text-center transition-all"
              : "inline-flex px-6 py-4",

            isActive && "disabled pointer-events-none bg-accent/20 opacity-50",
          )}
        >
          {link.label}
        </Link>
      </li>
    )
  })

  return (
    <>
      <nav>
        <Menu open={open} isMobile={isMobile} renderLinks={renderLinks} />
      </nav>
      <Button
        variant={"default"}
        className={cn(
          "fixed bottom-5 right-5 z-50 rounded-full p-9 mix-blend-hard-light md:hidden",
        )}
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Open"} Nav
      </Button>
    </>
  )
}
