"use client"

import { useAuth } from "@/components/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

export default function Logout() {
  const { logout } = useAuth()
  const { toast } = useToast()
  useEffect(() => {
    toast({
      description: "You have been logged out.",
    })
    logout()
  }, [])
  return <></>
}
