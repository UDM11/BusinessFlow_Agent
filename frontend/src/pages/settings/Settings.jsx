import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'

const Settings = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    timezone: 'UTC',
    notifications: true
  })

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'api', label: 'API Keys' }
  ]

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
              Profile Information
            </h3>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={profileData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={profileData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Timezone</label>
              <select
                name="timezone"
                className="form-input"
                value={profileData.timezone}
                onChange={handleChange}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
              </select>
            </div>
          </div>
        )
      
      case 'notifications':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
              Notification Preferences
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={profileData.notifications}
                  onChange={handleChange}
                />
                <span>Email notifications for agent completions</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" defaultChecked />
                <span>Workflow failure alerts</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" />
                <span>Weekly summary reports</span>
              </label>
            </div>
          </div>
        )
      
      case 'security':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
              Security Settings
            </h3>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input type="password" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input type="password" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input type="password" className="form-input" />
            </div>
            <Button variant="secondary">Change Password</Button>
          </div>
        )
      
      case 'api':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
              API Keys
            </h3>
            <div style={{ 
              padding: '16px', 
              background: '#f8fafc', 
              borderRadius: '6px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '500' }}>Production API Key</p>
                  <p style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                    bf_prod_••••••••••••••••
                  </p>
                </div>
                <Button variant="secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  Regenerate
                </Button>
              </div>
            </div>
            <Button>Create New API Key</Button>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
          Settings
        </h1>
        <p style={{ color: '#64748b' }}>
          Manage your account preferences and configuration
        </p>
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{ width: '200px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  background: activeTab === tab.id ? '#f1f5f9' : 'transparent',
                  color: activeTab === tab.id ? '#3b82f6' : '#64748b',
                  textAlign: 'left',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? '500' : 'normal'
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="card" style={{ flex: 1 }}>
          {renderTabContent()}
          
          {(activeTab === 'profile' || activeTab === 'notifications') && (
            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
              <Button onClick={handleSave} loading={loading}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings