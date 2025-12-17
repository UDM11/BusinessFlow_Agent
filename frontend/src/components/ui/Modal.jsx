import React from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{title}</h3>
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '20px',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal