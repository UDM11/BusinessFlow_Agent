import { useState, useEffect } from 'react'
import { apiClient } from '../utils/apiClient'

export const useBackendConnection = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const checkConnection = async () => {
    setLoading(true)
    const result = await apiClient.healthCheck()
    
    setIsConnected(result.success)
    setError(result.success ? null : result.error)
    setLoading(false)
    
    return result
  }

  useEffect(() => {
    checkConnection()
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [])

  return {
    isConnected,
    loading,
    error,
    checkConnection
  }
}