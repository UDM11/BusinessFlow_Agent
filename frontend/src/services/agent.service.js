import apiClient from './apiClient';

export const agentService = {
  executeWorkflow: async (prompt) => {
    const response = await apiClient.post('/agent/execute', { prompt });
    return response.data;
  },

  getExecutionStatus: async (executionId) => {
    const response = await apiClient.get(`/agent/status/${executionId}`);
    return response.data;
  },

  getWorkflowHistory: async () => {
    const response = await apiClient.get('/agent/history');
    return response.data;
  },

  cancelExecution: async (executionId) => {
    const response = await apiClient.post(`/agent/cancel/${executionId}`);
    return response.data;
  }
};