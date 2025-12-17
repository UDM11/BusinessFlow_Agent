import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api/authApi'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      // In production, validate token with backend
      setUser({ id: 1, email: 'user@example.com', name: 'John Doe' })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password)
      const { user, token } = response
      
      localStorage.setItem('authToken', token)
      setUser(user)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed'
      return { success: false, error: message }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}