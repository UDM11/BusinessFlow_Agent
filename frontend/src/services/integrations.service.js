import apiClient from './apiClient';

export const integrationsService = {
  getHealthStatus: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },

  testSlackConnection: async (token) => {
    const response = await apiClient.post('/slack/test', { token });
    return response.data;
  },

  testEmailConnection: async (config) => {
    const response = await apiClient.post('/email/test', config);
    return response.data;
  },

  testNotionConnection: async (apiKey) => {
    const response = await apiClient.post('/notion/test', { api_key: apiKey });
    return response.data;
  },

  testSheetsConnection: async (credentials) => {
    const response = await apiClient.post('/sheets/test', credentials);
    return response.data;
  },

  saveIntegrationConfig: async (service, config) => {
    const response = await apiClient.post(`/integrations/${service}`, config);
    return response.data;
  }
};