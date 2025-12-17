import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            BusinessFlow Agent
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '48px', opacity: 0.9 }}>
            AI-powered workflow automation platform that streamlines your business processes
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '16px' }}>
              Get Started
            </Link>
            <button className="btn btn-secondary" style={{ padding: '12px 32px', fontSize: '16px' }}>
              Learn More
            </button>
          </div>

          <div className="grid grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="card">
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
                🤖 AI Agents
              </h3>
              <p style={{ color: '#64748b' }}>
                Create intelligent agents that handle complex tasks automatically
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
                ⚡ Workflows
              </h3>
              <p style={{ color: '#64748b' }}>
                Build multi-step automation workflows with visual editor
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
                🔗 Integrations
              </h3>
              <p style={{ color: '#64748b' }}>
                Connect with popular tools like Slack, Notion, and Google Sheets
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage