import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/agents', label: 'AI Agents', icon: '🤖' },
    { path: '/workflows', label: 'Workflows', icon: '⚡' },
    { path: '/jobs', label: 'Jobs', icon: '📋' },
    { path: '/integrations', label: 'Integrations', icon: '🔗' },
    { path: '/system', label: 'System Health', icon: '💚' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <aside className="sidebar">
      <div style={{ padding: '0 24px', marginBottom: '32px' }}>
        <h2 style={{ color: '#3b82f6', fontSize: '20px', fontWeight: 'bold' }}>
          BusinessFlow
        </h2>
      </div>
      <nav>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span style={{ marginRight: '12px' }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar