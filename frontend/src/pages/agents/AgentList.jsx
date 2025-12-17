import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAgents } from '../../context/AgentContext'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'

const AgentList = () => {
  const { agents, deleteAgent, runAgent } = useAgents()
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, agent: null })
  const [runningAgents, setRunningAgents] = useState(new Set())

  const handleDelete = () => {
    if (deleteModal.agent) {
      deleteAgent(deleteModal.agent.id)
      setDeleteModal({ isOpen: false, agent: null })
    }
  }

  const handleRun = (agent) => {
    setRunningAgents(prev => new Set([...prev, agent.id]))
    runAgent(agent.id)
    
    setTimeout(() => {
      setRunningAgents(prev => {
        const newSet = new Set(prev)
        newSet.delete(agent.id)
        return newSet
      })
    }, 3000)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'running': return 'warning'
      case 'error': return 'error'
      default: return 'info'
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            AI Agents
          </h1>
          <p style={{ color: '#64748b' }}>
            Manage your intelligent automation agents
          </p>
        </div>
        <Link to="/agents/create">
          <Button>Create Agent</Button>
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>No agents yet</h3>
            <p style={{ marginBottom: '24px' }}>
              Create your first AI agent to start automating tasks
            </p>
            <Link to="/agents/create">
              <Button>Create First Agent</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Executions</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Last Run</th>
                  <th style={{ textAlign: 'right', padding: '12px 0', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map(agent => (
                  <tr key={agent.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 0' }}>
                      <div>
                        <p style={{ fontWeight: '500', marginBottom: '4px' }}>{agent.name}</p>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>{agent.description}</p>
                      </div>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <Badge variant={getStatusVariant(runningAgents.has(agent.id) ? 'running' : agent.status)}>
                        {runningAgents.has(agent.id) ? 'running' : agent.status}
                      </Badge>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ fontWeight: '500' }}>{agent.executions}</span>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ color: '#64748b' }}>{formatDate(agent.lastRun)}</span>
                    </td>
                    <td style={{ padding: '16px 0', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <Button
                          variant="secondary"
                          onClick={() => handleRun(agent)}
                          disabled={runningAgents.has(agent.id)}
                          loading={runningAgents.has(agent.id)}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Run
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => setDeleteModal({ isOpen: true, agent })}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, agent: null })}
        title="Delete Agent"
      >
        <p style={{ marginBottom: '24px' }}>
          Are you sure you want to delete "{deleteModal.agent?.name}"? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button
            variant="secondary"
            onClick={() => setDeleteModal({ isOpen: false, agent: null })}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default AgentList