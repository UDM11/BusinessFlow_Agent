import axiosInstance from './axiosInstance'

export const workflowApi = {
  getWorkflows: async () => {
    const response = await axiosInstance.get('/workflows')
    return response.data
  },

  getWorkflow: async (id) => {
    const response = await axiosInstance.get(`/workflows/${id}`)
    return response.data
  },

  createWorkflow: async (workflowData) => {
    const response = await axiosInstance.post('/workflows', workflowData)
    return response.data
  },

  updateWorkflow: async (id, workflowData) => {
    const response = await axiosInstance.put(`/workflows/${id}`, workflowData)
    return response.data
  },

  deleteWorkflow: async (id) => {
    const response = await axiosInstance.delete(`/workflows/${id}`)
    return response.data
  },

  runWorkflow: async (id, parameters = {}) => {
    const response = await axiosInstance.post(`/workflows/${id}/run`, parameters)
    return response.data
  },

  getWorkflowLogs: async (id, limit = 50) => {
    const response = await axiosInstance.get(`/workflows/${id}/logs`, {
      params: { limit }
    })
    return response.data
  }
}