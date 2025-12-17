import React from 'react'

const Badge = ({ children, variant = 'info' }) => {
  const getClassName = () => {
    let className = 'badge'
    
    switch (variant) {
      case 'success':
        className += ' badge-success'
        break
      case 'error':
        className += ' badge-error'
        break
      case 'warning':
        className += ' badge-warning'
        break
      default:
        className += ' badge-info'
    }
    
    return className
  }

  return (
    <span className={getClassName()}>
      {children}
    </span>
  )
}

export default Badge