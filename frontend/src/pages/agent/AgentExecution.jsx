import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { agentService } from '../../services/agent.service';
import { usePolling } from '../../hooks/usePolling';
import ExecutionSteps from '../../components/agent/ExecutionSteps';
import ToolsPanel from '../../components/agent/ToolsPanel';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const AgentExecution = () => {
  const { executionId } = useParams();
  const [execution, setExecution] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchExecutionStatus = async () => {
    if (!executionId) return;
    try {
      const data = await agentService.getExecutionStatus(executionId);
      setExecution(data);
    } catch (error) {
      console.error('Failed to fetch execution status:', error);
    }
  };

  const { startPolling, stopPolling } = usePolling(fetchExecutionStatus, 2000, [executionId]);

  useEffect(() => {
    if (executionId) {
      fetchExecutionStatus().then(() => setLoading(false));
      startPolling();
    }
    return () => stopPolling();
  }, [executionId]);

  useEffect(() => {
    if (execution?.status === 'completed' || execution?.status === 'failed') {
      stopPolling();
    }
  }, [execution?.status]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'failed': return <XCircle className="h-6 w-6 text-red-500" />;
      case 'running': return <Clock className="h-6 w-6 text-blue-500 animate-pulse" />;
      default: return <AlertCircle className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-100';
      case 'failed': return 'text-red-700 bg-red-100';
      case 'running': return 'text-blue-700 bg-blue-100';
      default: return 'text-yellow-700 bg-yellow-100';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading execution...</div>;
  }

  if (!execution) {
    return <div className="text-center text-gray-500">Execution not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getStatusIcon(execution.status)}
            <div>
              <h1 className="text-xl font-bold text-gray-900">Workflow Execution</h1>
              <p className="text-sm text-gray-600">ID: {execution.id}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(execution.status)}`}>
            {execution.status.toUpperCase()}
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Original Prompt</h3>
          <p className="text-gray-700">{execution.prompt}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ExecutionSteps steps={execution.steps || []} />
        </div>
        <div className="space-y-6">
          <ToolsPanel tools={execution.tools || []} />
        </div>
      </div>

      {execution.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-medium text-red-800 mb-2">Error Details</h3>
          <p className="text-red-700">{execution.error}</p>
        </div>
      )}
    </div>
  );
};

export default AgentExecution;