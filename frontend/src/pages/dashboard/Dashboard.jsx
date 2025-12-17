import React from 'react'
import { Link } from 'react-router-dom'
import { useAgents } from '../../context/AgentContext'
import { useWorkflows } from '../../context/WorkflowContext'
import Badge from '../../components/ui/Badge'

const Dashboard = () => {
  const { agents } = useAgents()
  const { workflows } = useWorkflows()

  const stats = [
    {
      label: 'Active Agents',
      value: agents.filter(a => a.status === 'active').length,
      total: agents.length,
      color: '#3b82f6'
    },
    {
      label: 'Running Workflows',
      value: workflows.filter(w => w.status === 'active').length,
      total: workflows.length,
      color: '#10b981'
    },
    {
      label: 'Total Executions',
      value: agents.reduce((sum, a) => sum + a.executions, 0),
      total: null,
      color: '#f59e0b'
    },
    {
      label: 'Success Rate',
      value: '98.5%',
      total: null,
      color: '#ef4444'
    }
  ]

  const recentActivity = [
    { id: 1, type: 'agent', name: 'Email Assistant', action: 'completed execution', time: '2 minutes ago' },
    { id: 2, type: 'workflow', name: 'Customer Onboarding', action: 'started', time: '5 minutes ago' },
    { id: 3, type: 'agent', name: 'Data Processor', action: 'updated configuration', time: '1 hour ago' },
    { id: 4, type: 'workflow', name: 'Data Sync Pipeline', action: 'paused', time: '2 hours ago' }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
          Dashboard
        </h1>
        <p style={{ color: '#64748b' }}>
          Overview of your AI agents and workflow automation
        </p>
      </div>

      <div className="grid grid-4" style={{ marginBottom: '32px' }}>
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color }}>
                  {stat.value}
                  {stat.total && <span style={{ fontSize: '16px', color: '#64748b' }}>/{stat.total}</span>}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Recent Agents</h3>
            <Link to="/agents" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
              View All
            </Link>
          </div>
          
          {agents.length === 0 ? (
            <div className="empty-state">
              <p>No agents created yet</p>
              <Link to="/agents/create" className="btn btn-primary" style={{ marginTop: '12px' }}>
                Create First Agent
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {agents.slice(0, 3).map(agent => (
                <div key={agent.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '6px'
                }}>
                  <div>
                    <p style={{ fontWeight: '500' }}>{agent.name}</p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>
                      {agent.executions} executions
                    </p>
                  </div>
                  <Badge variant={agent.status === 'active' ? 'success' : 'info'}>
                    {agent.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Recent Activity</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivity.map(activity => (
              <div key={activity.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px',
                background: '#f8fafc',
                borderRadius: '6px'
              }}>
                <div>
                  <p style={{ fontWeight: '500' }}>
                    {activity.name} {activity.action}
                  </p>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>
                    {activity.time}
                  </p>
                </div>
                <Badge variant="info">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard