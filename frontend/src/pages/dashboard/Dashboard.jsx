import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { integrationsService } from '../../services/integrations.service';
import { agentService } from '../../services/agent.service';
import { Activity, CheckCircle, XCircle, Clock, Play } from 'lucide-react';

const Dashboard = () => {
  const [healthStatus, setHealthStatus] = useState({});
  const [recentWorkflows, setRecentWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [health, workflows] = await Promise.all([
        integrationsService.getHealthStatus(),
        agentService.getWorkflowHistory()
      ]);
      setHealthStatus(health);
      setRecentWorkflows(workflows.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => navigate('/workflows')}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Play className="h-4 w-4" />
          <span>New Workflow</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-2xl font-bold text-gray-900">
                {healthStatus.status === 'healthy' ? 'Healthy' : 'Issues'}
              </p>
            </div>
          </div>
        </div>

        {['slack', 'email', 'notion', 'sheets'].map((service) => (
          <div key={service} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 capitalize">{service}</p>
                <p className="text-lg font-semibold text-gray-900">
                  {healthStatus[service]?.status || 'Unknown'}
                </p>
              </div>
              {getStatusIcon(healthStatus[service]?.status)}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Workflows</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentWorkflows.length > 0 ? (
            recentWorkflows.map((workflow) => (
              <div key={workflow.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {workflow.prompt.substring(0, 80)}...
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(workflow.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    workflow.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : workflow.status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {workflow.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No workflows yet. Create your first workflow to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;