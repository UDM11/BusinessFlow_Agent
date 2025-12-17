import React from 'react'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const IntegrationList = () => {
  const integrations = [
    {
      id: 1,
      name: 'Slack',
      description: 'Send notifications and messages',
      status: 'connected',
      icon: '💬',
      lastSync: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Google Sheets',
      description: 'Read and write spreadsheet data',
      status: 'connected',
      icon: '📊',
      lastSync: '2024-01-15T09:15:00Z'
    },
    {
      id: 3,
      name: 'Notion',
      description: 'Manage pages and databases',
      status: 'disconnected',
      icon: '📝',
      lastSync: null
    },
    {
      id: 4,
      name: 'OpenAI',
      description: 'AI model integration',
      status: 'connected',
      icon: '🤖',
      lastSync: '2024-01-15T10:25:00Z'
    },
    {
      id: 5,
      name: 'Email (SMTP)',
      description: 'Send automated emails',
      status: 'error',
      icon: '📧',
      lastSync: '2024-01-14T15:30:00Z'
    }
  ]

  const getStatusVariant = (status) => {
    switch (status) {
      case 'connected': return 'success'
      case 'error': return 'error'
      case 'disconnected': return 'info'
      default: return 'info'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleString()
  }

  const getActionButton = (integration) => {
    switch (integration.status) {
      case 'connected':
        return (
          <Button variant="secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
            Configure
          </Button>
        )
      case 'disconnected':
        return (
          <Button style={{ padding: '6px 12px', fontSize: '12px' }}>
            Connect
          </Button>
        )
      case 'error':
        return (
          <Button variant="danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
            Reconnect
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
          Integrations
        </h1>
        <p style={{ color: '#64748b' }}>
          Connect with external services and tools
        </p>
      </div>

      <div className="grid grid-2">
        {integrations.map(integration => (
          <div key={integration.id} className="card">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ fontSize: '32px' }}>{integration.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{integration.name}</h3>
                  <Badge variant={getStatusVariant(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
                <p style={{ color: '#64748b', marginBottom: '12px' }}>
                  {integration.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Last sync: {formatDate(integration.lastSync)}
                  </span>
                  {getActionButton(integration)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Available Integrations
        </h3>
        <div className="grid grid-4">
          {['Zapier', 'Microsoft Teams', 'Trello', 'GitHub'].map(name => (
            <div key={name} style={{ 
              padding: '16px', 
              border: '2px dashed #e2e8f0', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <p style={{ fontWeight: '500', marginBottom: '8px' }}>{name}</p>
              <Button variant="secondary" style={{ padding: '4px 8px', fontSize: '12px' }}>
                Coming Soon
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IntegrationList