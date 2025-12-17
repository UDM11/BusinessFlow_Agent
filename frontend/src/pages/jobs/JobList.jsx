import React from 'react'
import Badge from '../../components/ui/Badge'

const JobList = () => {
  const jobs = [
    {
      id: 1,
      name: 'Email Processing Job',
      type: 'agent',
      status: 'completed',
      startTime: '2024-01-15T10:30:00Z',
      duration: '2.3s',
      result: 'success'
    },
    {
      id: 2,
      name: 'Customer Onboarding Workflow',
      type: 'workflow',
      status: 'running',
      startTime: '2024-01-15T10:28:00Z',
      duration: '45s',
      result: 'pending'
    },
    {
      id: 3,
      name: 'Data Sync Pipeline',
      type: 'workflow',
      status: 'failed',
      startTime: '2024-01-15T10:25:00Z',
      duration: '12s',
      result: 'error'
    }
  ]

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'running': return 'warning'
      case 'failed': return 'error'
      default: return 'info'
    }
  }

  const getResultVariant = (result) => {
    switch (result) {
      case 'success': return 'success'
      case 'error': return 'error'
      case 'pending': return 'warning'
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
          Job History
        </h1>
        <p style={{ color: '#64748b' }}>
          View execution history and logs for agents and workflows
        </p>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Job Name</th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Start Time</th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Duration</th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Result</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 0' }}>
                    <p style={{ fontWeight: '500' }}>{job.name}</p>
                  </td>
                  <td style={{ padding: '16px 0' }}>
                    <Badge variant="info">{job.type}</Badge>
                  </td>
                  <td style={{ padding: '16px 0' }}>
                    <Badge variant={getStatusVariant(job.status)}>
                      {job.status}
                    </Badge>
                  </td>
                  <td style={{ padding: '16px 0' }}>
                    <span style={{ color: '#64748b' }}>{formatTime(job.startTime)}</span>
                  </td>
                  <td style={{ padding: '16px 0' }}>
                    <span style={{ fontWeight: '500' }}>{job.duration}</span>
                  </td>
                  <td style={{ padding: '16px 0' }}>
                    <Badge variant={getResultVariant(job.result)}>
                      {job.result}
                    </Badge>
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

export default JobList