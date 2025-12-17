import React from 'react'
import { AuthProvider } from '../context/AuthContext'
import { AgentProvider } from '../context/AgentContext'
import { WorkflowProvider } from '../context/WorkflowContext'
import Router from './Router'

const App = () => {
  return (
    <AuthProvider>
      <AgentProvider>
        <WorkflowProvider>
          <Router />
        </WorkflowProvider>
      </AgentProvider>
    </AuthProvider>
  )
}

export default App