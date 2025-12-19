import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';

const IntegrationCard = ({ integration, status, onTest }) => {
  const [config, setConfig] = useState({});
  const [testing, setTesting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const getStatusIcon = () => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'border-green-200 bg-green-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-yellow-200 bg-yellow-50';
    }
  };

  const handleTest = async () => {
    setTesting(true);
    try {
      await onTest(config);
      alert('Connection test successful!');
    } catch (error) {
      alert(`Connection test failed: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`border rounded-lg p-6 ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <integration.icon className="h-6 w-6 text-gray-700" />
          <div>
            <h3 className="font-medium text-gray-900">{integration.name}</h3>
            <p className="text-sm text-gray-600">{integration.description}</p>
          </div>
        </div>
        {getStatusIcon()}
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          {expanded ? 'Hide Configuration' : 'Configure'}
        </button>

        {expanded && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {integration.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder={field.placeholder}
                    value={config[field.name] || ''}
                    onChange={(e) => handleConfigChange(field.name, e.target.value)}
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder={field.placeholder}
                    value={config[field.name] || ''}
                    onChange={(e) => handleConfigChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}

            <button
              onClick={handleTest}
              disabled={testing}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-700 disabled:opacity-50"
            >
              {testing ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <span>Test Connection</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationCard;