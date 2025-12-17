import axiosInstance from './axiosInstance'

export const agentApi = {
  // Get all agents
  getAgents: async () => {
    const response = await axiosInstance.get('/agents')
    return response.data
  },

  // Get single agent by ID
  getAgent: async (id) => {
    const response = await axiosInstance.get(`/agents/${id}`)
    return response.data
  },

  // Create new agent
  createAgent: async (agentData) => {
    const response = await axiosInstance.post('/agents', agentData)
    return response.data
  },

  // Update agent
  updateAgent: async (id, agentData) => {
    const response = await axiosInstance.put(`/agents/${id}`, agentData)
    return response.data
  },

  // Delete agent
  deleteAgent: async (id) => {
    const response = await axiosInstance.delete(`/agents/${id}`)
    return response.data
  },

  // Run agent
  runAgent: async (id, parameters = {}) => {
    const response = await axiosInstance.post(`/agents/${id}/run`, parameters)
    return response.data
  },

  // Get agent execution logs
  getAgentLogs: async (id, limit = 50) => {
    const response = await axiosInstance.get(`/agents/${id}/logs`, {
      params: { limit }
    })
    return response.data
  },

  // Get agent memory/context
  getAgentMemory: async (id) => {
    const response = await axiosInstance.get(`/agents/${id}/memory`)
    return response.data
  }
}