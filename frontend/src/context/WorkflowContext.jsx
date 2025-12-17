import React, { createContext, useContext, useState } from 'react'

const WorkflowContext = createContext()

export const useWorkflows = () => {
  const context = useContext(WorkflowContext)
  if (!context) {
    throw new Error('useWorkflows must be used within WorkflowProvider')
  }
  return context
}

export const WorkflowProvider = ({ children }) => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Customer Onboarding',
      description: 'Automated customer onboarding process',
      status: 'active',
      steps: 5,
      lastRun: '2024-01-15T09:15:00Z',
      executions: 23
    },
    {
      id: 2,
      name: 'Data Sync Pipeline',
      description: 'Syncs data between systems',
      status: 'paused',
      steps: 3,
      lastRun: '2024-01-13T14:20:00Z',
      executions: 67
    }
  ])

  const addWorkflow = (workflow) => {
    const newWorkflow = {
      ...workflow,
      id: Date.now(),
      status: 'draft',
      executions: 0,
      lastRun: null
    }
    setWorkflows(prev => [...prev, newWorkflow])
  }

  const updateWorkflow = (id, updates) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === id ? { ...workflow, ...updates } : workflow
    ))
  }

  const deleteWorkflow = (id) => {
    setWorkflows(prev => prev.filter(workflow => workflow.id !== id))
  }

  const runWorkflow = (id) => {
    updateWorkflow(id, { 
      status: 'running',
      lastRun: new Date().toISOString()
    })
    
    setTimeout(() => {
      updateWorkflow(id, { 
        status: 'active',
        executions: workflows.find(w => w.id === id)?.executions + 1 || 1
      })
    }, 5000)
  }

  const value = {
    workflows,
    addWorkflow,
    updateWorkflow,
    deleteWorkflow,
    runWorkflow
  }

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  )
}