import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(email, password)
    
    if (!result.success) {
      setError(result.error || 'Login failed')
    }
    
    setLoading(false)
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f8fafc'
    }}>
      <div className="card" style={{ width: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>
            BusinessFlow
          </h2>
          <p style={{ color: '#64748b', marginTop: '8px' }}>
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            style={{ width: '100%', marginTop: '8px' }}
          >
            Sign In
          </Button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#64748b' }}>
          Demo credentials: any email/password
        </div>
      </div>
    </div>
  )
}

export default LoginPage