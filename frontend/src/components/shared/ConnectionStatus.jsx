import React from 'react'
import { useBackendConnection } from '../../hooks/useBackendConnection'
import Badge from '../ui/Badge'

const ConnectionStatus = () => {
  const { isConnected, loading, error } = useBackendConnection()

  if (loading) {
    return (
      <Badge variant="info">
        Connecting...
      </Badge>
    )
  }

  return (
    <Badge variant={isConnected ? 'success' : 'error'}>
      {isConnected ? 'Connected' : 'Disconnected'}
    </Badge>
  )
}

export default ConnectionStatus