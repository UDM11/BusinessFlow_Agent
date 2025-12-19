import React, { useState, useEffect } from 'react';
import { integrationsService } from '../../services/integrations.service';
import IntegrationCard from '../../components/ui/IntegrationCard';
import { Mail, MessageSquare, FileText, Table } from 'lucide-react';

const Integrations = () => {
  const [integrations, setIntegrations] = useState({
    slack: { status: 'disconnected', config: {} },
    email: { status: 'disconnected', config: {} },
    notion: { status: 'disconnected', config: {} },
    sheets: { status: 'disconnected', config: {} }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const health = await integrationsService.getHealthStatus();
      setIntegrations({
        slack: { status: health.slack?.status || 'disconnected', config: {} },
        email: { status: health.email?.status || 'disconnected', config: {} },
        notion: { status: health.notion?.status || 'disconnected', config: {} },
        sheets: { status: health.sheets?.status || 'disconnected', config: {} }
      });
    } catch (error) {
      console.error('Failed to load integrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async (service, config) => {
    try {
      let result;
      switch (service) {
        case 'slack':
          result = await integrationsService.testSlackConnection(config.token);
          break;
        case 'email':
          result = await integrationsService.testEmailConnection(config);
          break;
        case 'notion':
          result = await integrationsService.testNotionConnection(config.apiKey);
          break;
        case 'sheets':
          result = await integrationsService.testSheetsConnection(config);
          break;
      }
      
      setIntegrations(prev => ({
        ...prev,
        [service]: { ...prev[service], status: result.success ? 'connected' : 'error' }
      }));
      
      return result;
    } catch (error) {
      setIntegrations(prev => ({
        ...prev,
        [service]: { ...prev[service], status: 'error' }
      }));
      throw error;
    }
  };

  const integrationConfigs = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send messages and notifications to Slack channels',
      icon: MessageSquare,
      fields: [
        { name: 'token', label: 'Bot Token', type: 'password', placeholder: 'xoxb-...' }
      ]
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Send emails via SMTP',
      icon: Mail,
      fields: [
        { name: 'host', label: 'SMTP Host', type: 'text', placeholder: 'smtp.gmail.com' },
        { name: 'port', label: 'Port', type: 'number', placeholder: '587' },
        { name: 'username', label: 'Username', type: 'email', placeholder: 'your@email.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'App password' }
      ]
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Create and update Notion pages and databases',
      icon: FileText,
      fields: [
        { name: 'apiKey', label: 'API Key', type: 'password', placeholder: 'secret_...' },
        { name: 'databaseId', label: 'Database ID', type: 'text', placeholder: 'Database ID (optional)' }
      ]
    },
    {
      id: 'sheets',
      name: 'Google Sheets',
      description: 'Read and write data to Google Sheets',
      icon: Table,
      fields: [
        { name: 'serviceAccount', label: 'Service Account JSON', type: 'textarea', placeholder: 'Paste service account JSON...' },
        { name: 'sheetId', label: 'Sheet ID', type: 'text', placeholder: 'Sheet ID (optional)' }
      ]
    }
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading integrations...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="mt-2 text-gray-600">
          Configure your external service connections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrationConfigs.map((config) => (
          <IntegrationCard
            key={config.id}
            integration={config}
            status={integrations[config.id].status}
            onTest={(configData) => handleTest(config.id, configData)}
          />
        ))}
      </div>
    </div>
  );
};

export default Integrations;