import React from 'react'
import Badge from '../../components/ui/Badge'

const SystemHealth = () => {
  const systemMetrics = [
    { label: 'API Status', value: 'Healthy', variant: 'success' },
    { label: 'Database', value: 'Connected', variant: 'success' },
    { label: 'Queue System', value: 'Running', variant: 'success' },
    { label: 'Storage', value: 'Available', variant: 'success' }
  ]

  const performanceMetrics = [
    { label: 'CPU Usage', value: '23%', color: '#10b981' },
    { label: 'Memory Usage', value: '67%', color: '#f59e0b' },
    { label: 'Disk Usage', value: '45%', color: '#3b82f6' },
    { label: 'Network I/O', value: '12%', color: '#8b5cf6' }
  ]

  const recentLogs = [
    {
      id: 1,
      timestamp: '2024-01-15T10:30:15Z',
      level: 'INFO',
      message: 'Agent "Email Assistant" completed successfully',
      source: 'agent-service'
    },
    {
      id: 2,
      timestamp: '2024-01-15T10:29:45Z',
      level: 'WARN',
      message: 'High memory usage detected (85%)',
      source: 'system-monitor'
    },
    {
      id: 3,
      timestamp: '2024-01-15T10:28:30Z',
      level: 'ERROR',
      message: 'Failed to connect to external API: timeout',
      source: 'integration-service'
    },
    {
      id: 4,
      timestamp: '2024-01-15T10:27:12Z',
      level: 'INFO',
      message: 'Workflow "Customer Onboarding" started',
      source: 'workflow-engine'
    }
  ]

  const getLevelVariant = (level) => {
    switch (level) {
      case 'ERROR': return 'error'
      case 'WARN': return 'warning'
      case 'INFO': return 'info'
      default: return 'info'
    }
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
          System Health
        </h1>
        <p style={{ color: '#64748b' }}>
          Monitor system status, performance, and logs
        </p>
      </div>

      <div className="grid grid-2" style={{ marginBottom: '32px' }}>
        <div className="card">
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
            System Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {systemMetrics.map((metric, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px',
                background: '#f8fafc',
                borderRadius: '6px'
              }}>
                <span style={{ fontWeight: '500' }}>{metric.label}</span>
                <Badge variant={metric.variant}>{metric.value}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
            Performance Metrics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {performanceMetrics.map((metric, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '500' }}>{metric.label}</span>
                  <span style={{ color: metric.color, fontWeight: '600' }}>{metric.value}</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  background: '#e2e8f0', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: metric.value, 
                    height: '100%', 
                    background: metric.color,
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
          Recent System Logs
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Timestamp</th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Level</th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Message</th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Source</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 0' }}>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>
                      {formatTime(log.timestamp)}
                    </span>
                  </td>
                  <td style={{ padding: '12px 0' }}>
                    <Badge variant={getLevelVariant(log.level)}>
                      {log.level}
                    </Badge>
                  </td>
                  <td style={{ padding: '12px 0' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                      {log.message}
                    </span>
                  </td>
                  <td style={{ padding: '12px 0' }}>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>
                      {log.source}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SystemHealth