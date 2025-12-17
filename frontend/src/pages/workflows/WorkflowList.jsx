import React, { useState } from 'react'
import { useWorkflows } from '../../context/WorkflowContext'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'

const WorkflowList = () => {
  const { workflows, deleteWorkflow, runWorkflow } = useWorkflows()
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, workflow: null })
  const [runningWorkflows, setRunningWorkflows] = useState(new Set())

  const handleDelete = () => {
    if (deleteModal.workflow) {
      deleteWorkflow(deleteModal.workflow.id)
      setDeleteModal({ isOpen: false, workflow: null })
    }
  }

  const handleRun = (workflow) => {
    setRunningWorkflows(prev => new Set([...prev, workflow.id]))
    runWorkflow(workflow.id)
    
    setTimeout(() => {
      setRunningWorkflows(prev => {
        const newSet = new Set(prev)
        newSet.delete(workflow.id)
        return newSet
      })
    }, 5000)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'running': return 'warning'
      case 'paused': return 'info'
      case 'error': return 'error'
      default: return 'info'
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Workflows
          </h1>
          <p style={{ color: '#64748b' }}>
            Manage your multi-step automation workflows
          </p>
        </div>
        <Button>Create Workflow</Button>
      </div>

      {workflows.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>No workflows yet</h3>
            <p style={{ marginBottom: '24px' }}>
              Create your first workflow to automate complex processes
            </p>
            <Button>Create First Workflow</Button>
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
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Steps</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Executions</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600' }}>Last Run</th>
                  <th style={{ textAlign: 'right', padding: '12px 0', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workflows.map(workflow => (
                  <tr key={workflow.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 0' }}>
                      <div>
                        <p style={{ fontWeight: '500', marginBottom: '4px' }}>{workflow.name}</p>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>{workflow.description}</p>
                      </div>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <Badge variant={getStatusVariant(runningWorkflows.has(workflow.id) ? 'running' : workflow.status)}>
                        {runningWorkflows.has(workflow.id) ? 'running' : workflow.status}
                      </Badge>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ fontWeight: '500' }}>{workflow.steps}</span>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ fontWeight: '500' }}>{workflow.executions}</span>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ color: '#64748b' }}>{formatDate(workflow.lastRun)}</span>
                    </td>
                    <td style={{ padding: '16px 0', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <Button
                          variant="secondary"
                          onClick={() => handleRun(workflow)}
                          disabled={runningWorkflows.has(workflow.id)}
                          loading={runningWorkflows.has(workflow.id)}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Run
                        </Button>
                        <Button
                          variant="secondary"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => setDeleteModal({ isOpen: true, workflow })}
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
        onClose={() => setDeleteModal({ isOpen: false, workflow: null })}
        title="Delete Workflow"
      >
        <p style={{ marginBottom: '24px' }}>
          Are you sure you want to delete "{deleteModal.workflow?.name}"? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button
            variant="secondary"
            onClick={() => setDeleteModal({ isOpen: false, workflow: null })}
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

export default WorkflowList