import React from 'react'

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: '16px', height: '16px' }
      case 'large':
        return { width: '32px', height: '32px' }
      default:
        return { width: '24px', height: '24px' }
    }
  }

  return (
    <div className="loading">
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" style={getSize()}></div>
        {text && <p style={{ marginTop: '12px', color: '#64748b' }}>{text}</p>}
      </div>
    </div>
  )
}

export default Loader