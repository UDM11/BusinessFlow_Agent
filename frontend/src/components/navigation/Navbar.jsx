import React from 'react'
import { useAuth } from '../../context/AuthContext'
import ConnectionStatus from '../shared/ConnectionStatus'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="navbar">
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '600' }}>
          Welcome back, {user?.name}
        </h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ConnectionStatus />
        <span style={{ color: '#64748b' }}>{user?.email}</span>
        <button onClick={logout} className="btn btn-secondary">
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar