import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAgents } from '../../context/AgentContext'
import Button from '../../components/ui/Button'

const AgentCreate = () => {
  const navigate = useNavigate()
  const { addAgent } = useAgents()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'email',
    configuration: ''
  })

  const agentTypes = [
    { value: 'email', label: 'Email Assistant' },
    { value: 'data', label: 'Data Processor' },
    { value: 'notification', label: 'Notification Handler' },
    { value: 'integration', label: 'Integration Agent' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      addAgent(formData)
      setLoading(false)
      navigate('/agents')
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
          Create AI Agent
        </h1>
        <p style={{ color: '#64748b' }}>
          Configure a new intelligent agent for task automation
        </p>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Agent Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter agent name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what this agent does"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Agent Type</label>
            <select
              name="type"
              className="form-input"
              value={formData.type}
              onChange={handleChange}
              required
            >
              {agentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Configuration (JSON)</label>
            <textarea
              name="configuration"
              className="form-input"
              value={formData.configuration}
              onChange={handleChange}
              placeholder='{"key": "value"}'
              rows="6"
            />
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Optional: JSON configuration for advanced settings
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/agents')}
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Create Agent
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AgentCreate