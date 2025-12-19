export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    VERIFY: '/auth/verify'
  },
  AGENT: {
    EXECUTE: '/agent/execute',
    STATUS: '/agent/status',
    HISTORY: '/agent/history',
    CANCEL: '/agent/cancel'
  },
  INTEGRATIONS: {
    HEALTH: '/health',
    SLACK_TEST: '/slack/test',
    EMAIL_TEST: '/email/test',
    NOTION_TEST: '/notion/test',
    SHEETS_TEST: '/sheets/test'
  }
};

export const EXECUTION_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

export const INTEGRATION_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  ERROR: 'error'
};