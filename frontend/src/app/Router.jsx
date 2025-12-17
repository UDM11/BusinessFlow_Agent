import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../layouts/MainLayout'
import LandingPage from '../pages/public/LandingPage'
import LoginPage from '../pages/public/LoginPage'
import Dashboard from '../pages/dashboard/Dashboard'
import AgentList from '../pages/agents/AgentList'
import AgentCreate from '../pages/agents/AgentCreate'
import WorkflowList from '../pages/workflows/WorkflowList'
import JobList from '../pages/jobs/JobList'
import IntegrationList from '../pages/integrations/IntegrationList'
import SystemHealth from '../pages/system/SystemHealth'
import Settings from '../pages/settings/Settings'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" /> : children
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/agents" element={
          <ProtectedRoute>
            <MainLayout>
              <AgentList />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/agents/create" element={
          <ProtectedRoute>
            <MainLayout>
              <AgentCreate />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/workflows" element={
          <ProtectedRoute>
            <MainLayout>
              <WorkflowList />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <MainLayout>
              <JobList />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/integrations" element={
          <ProtectedRoute>
            <MainLayout>
              <IntegrationList />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/system" element={
          <ProtectedRoute>
            <MainLayout>
              <SystemHealth />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <MainLayout>
              <Settings />
            </MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default Router