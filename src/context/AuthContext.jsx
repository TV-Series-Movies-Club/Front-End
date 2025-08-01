"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { userService } from "../services/user"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage and refresh latest user info from server
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken) {
      setToken(storedToken)
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        // Refresh the latest profile
        userService.getProfile().then((freshUser) => {
          setUser(freshUser)
          localStorage.setItem("user", JSON.stringify(freshUser))
        }).catch(err => {
          console.error("Failed to fetch user profile:", err)
        })
      } catch (err) {
        console.error("Failed to parse stored user:", err)
        localStorage.removeItem("user")
      }
    }

    setLoading(false)
  }, [])

  const login = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    localStorage.setItem("token", authToken)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  const updateUser = async () => {
    try {
      const updated = await userService.getProfile()
      setUser(updated)
      localStorage.setItem("user", JSON.stringify(updated))
    } catch (err) {
      console.error("Failed to update user info:", err)
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
