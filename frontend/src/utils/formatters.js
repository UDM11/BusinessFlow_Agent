// Date formatting utilities
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'Never'
  
  const date = new Date(dateString)
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

export const formatRelativeTime = (dateString) => {
  if (!dateString) return 'Never'
  
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return formatDate(dateString)
}

// Status formatting
export const getStatusColor = (status) => {
  const colors = {
    active: '#10b981',
    running: '#f59e0b',
    idle: '#6b7280',
    error: '#ef4444',
    paused: '#3b82f6',
    completed: '#10b981',
    failed: '#ef4444',
    pending: '#f59e0b'
  }
  return colors[status] || '#6b7280'
}

export const getStatusVariant = (status) => {
  const variants = {
    active: 'success',
    running: 'warning',
    idle: 'info',
    error: 'error',
    paused: 'info',
    completed: 'success',
    failed: 'error',
    pending: 'warning',
    connected: 'success',
    disconnected: 'info'
  }
  return variants[status] || 'info'
}

// Number formatting
export const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export const formatPercentage = (value, total) => {
  if (!total || total === 0) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

// Duration formatting
export const formatDuration = (milliseconds) => {
  if (milliseconds < 1000) return `${milliseconds}ms`
  if (milliseconds < 60000) return `${(milliseconds / 1000).toFixed(1)}s`
  if (milliseconds < 3600000) return `${Math.floor(milliseconds / 60000)}m ${Math.floor((milliseconds % 60000) / 1000)}s`
  
  const hours = Math.floor(milliseconds / 3600000)
  const minutes = Math.floor((milliseconds % 3600000) / 60000)
  return `${hours}h ${minutes}m`
}

// Text utilities
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}