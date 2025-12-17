import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const getClassName = () => {
    let className = 'btn'
    
    switch (variant) {
      case 'secondary':
        className += ' btn-secondary'
        break
      case 'danger':
        className += ' btn-danger'
        break
      default:
        className += ' btn-primary'
    }
    
    if (disabled || loading) {
      className += ' opacity-50 cursor-not-allowed'
    }
    
    return className
  }

  return (
    <button
      type={type}
      className={getClassName()}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
          Loading...
        </span>
      ) : children}
    </button>
  )
}

export default Button