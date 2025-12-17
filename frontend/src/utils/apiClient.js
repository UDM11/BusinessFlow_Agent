import axiosInstance from '../api/axiosInstance'

export const apiClient = {
  // Test backend connection
  healthCheck: async () => {
    try {
      const response = await axiosInstance.get('/health')
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Generic API call wrapper
  call: async (method, endpoint, data = null, config = {}) => {
    try {
      const response = await axiosInstance({
        method,
        url: endpoint,
        data,
        ...config
      })
      return { success: true, data: response.data }
    } catch (error) {
      const message = error.response?.data?.message || error.message
      return { success: false, error: message, status: error.response?.status }
    }
  }
}