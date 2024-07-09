"use client"

import ROUTES from "@/lib/constants/routes"
import { useRouter } from "next/navigation"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

interface User {
  id: number
  username: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (username: string, password: string) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
    const user = { id: data.id, username: data.username }
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
    router.push(ROUTES.dashboard.path)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push(ROUTES.home.path)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
