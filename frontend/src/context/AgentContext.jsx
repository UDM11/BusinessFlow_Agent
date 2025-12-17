import React, { createContext, useContext, useState } from 'react'

const AgentContext = createContext()

export const useAgents = () => {
  const context = useContext(AgentContext)
  if (!context) {
    throw new Error('useAgents must be used within AgentProvider')
  }
  return context
}

export const AgentProvider = ({ children }) => {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Email Assistant',
      description: 'Handles email automation and responses',
      status: 'active',
      lastRun: '2024-01-15T10:30:00Z',
      executions: 156
    },
    {
      id: 2,
      name: 'Data Processor',
      description: 'Processes and analyzes incoming data',
      status: 'idle',
      lastRun: '2024-01-14T15:45:00Z',
      executions: 89
    }
  ])

  const addAgent = (agent) => {
    const newAgent = {
      ...agent,
      id: Date.now(),
      status: 'idle',
      executions: 0,
      lastRun: null
    }
    setAgents(prev => [...prev, newAgent])
  }

  const updateAgent = (id, updates) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, ...updates } : agent
    ))
  }

  const deleteAgent = (id) => {
    setAgents(prev => prev.filter(agent => agent.id !== id))
  }

  const runAgent = (id) => {
    updateAgent(id, { 
      status: 'running',
      lastRun: new Date().toISOString()
    })
    
    // Simulate agent execution
    setTimeout(() => {
      updateAgent(id, { 
        status: 'active',
        executions: agents.find(a => a.id === id)?.executions + 1 || 1
      })
    }, 3000)
  }

  const value = {
    agents,
    addAgent,
    updateAgent,
    deleteAgent,
    runAgent
  }

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  )
}