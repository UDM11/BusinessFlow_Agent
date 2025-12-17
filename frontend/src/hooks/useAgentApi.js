import { useState, useEffect } from 'react'
import { agentApi } from '../api/agentApi'

export const useAgentApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleApiCall = async (apiCall) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiCall()
      setLoading(false)
      return { success: true, data: result }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred'
      setError(errorMessage)
      setLoading(false)
      return { success: false, error: errorMessage }
    }
  }

  return {
    loading,
    error,
    clearError: () => setError(null),
    
    // Agent operations
    getAgents: () => handleApiCall(() => agentApi.getAgents()),
    getAgent: (id) => handleApiCall(() => agentApi.getAgent(id)),
    createAgent: (data) => handleApiCall(() => agentApi.createAgent(data)),
    updateAgent: (id, data) => handleApiCall(() => agentApi.updateAgent(id, data)),
    deleteAgent: (id) => handleApiCall(() => agentApi.deleteAgent(id)),
    runAgent: (id, params) => handleApiCall(() => agentApi.runAgent(id, params)),
    getAgentLogs: (id, limit) => handleApiCall(() => agentApi.getAgentLogs(id, limit)),
    getAgentMemory: (id) => handleApiCall(() => agentApi.getAgentMemory(id))
  }
}

// Hook for fetching agents list with auto-refresh
export const useAgents = (autoRefresh = false, interval = 30000) => {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const api = useAgentApi()

  const fetchAgents = async () => {
    const result = await api.getAgents()
    if (result.success) {
      setAgents(result.data)
      setError(null)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAgents()

    if (autoRefresh) {
      const intervalId = setInterval(fetchAgents, interval)
      return () => clearInterval(intervalId)
    }
  }, [autoRefresh, interval])

  return {
    agents,
    loading,
    error,
    refetch: fetchAgents,
    ...api
  }
}