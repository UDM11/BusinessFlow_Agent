import axiosInstance from './axiosInstance'

export const authApi = {
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password })
    return response.data
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData)
    return response.data
  },

  logout: async () => {
    const response = await axiosInstance.post('/auth/logout')
    return response.data
  },

  refreshToken: async () => {
    const response = await axiosInstance.post('/auth/refresh')
    return response.data
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile')
    return response.data
  }
}