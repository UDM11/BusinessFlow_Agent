import React from 'react';
import { Mail, MessageSquare, FileText, Table, CheckCircle, XCircle, Clock } from 'lucide-react';

const ToolsPanel = ({ tools }) => {
  const getToolIcon = (toolName) => {
    switch (toolName.toLowerCase()) {
      case 'email': return <Mail className="h-5 w-5" />;
      case 'slack': return <MessageSquare className="h-5 w-5" />;
      case 'notion': return <FileText className="h-5 w-5" />;
      case 'sheets': return <Table className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running': return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getToolColor = (status) => {
    switch (status) {
      case 'completed': return 'border-green-200 bg-green-50';
      case 'failed': return 'border-red-200 bg-red-50';
      case 'running': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Tools Execution</h2>
      
      {tools.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No tools selected yet...
        </div>
      ) : (
        <div className="space-y-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getToolColor(tool.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getToolIcon(tool.name)}
                  <span className="font-medium text-gray-900 capitalize">{tool.name}</span>
                </div>
                {getStatusIcon(tool.status)}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{tool.action}</p>
              
              {tool.parameters && (
                <div className="text-xs text-gray-500">
                  <strong>Parameters:</strong>
                  <pre className="mt-1 whitespace-pre-wrap">
                    {JSON.stringify(tool.parameters, null, 2)}
                  </pre>
                </div>
              )}
              
              {tool.result && (
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Result:</strong>
                  <p className="mt-1">{tool.result}</p>
                </div>
              )}
              
              {tool.error && (
                <div className="mt-2 text-xs text-red-600">
                  <strong>Error:</strong>
                  <p className="mt-1">{tool.error}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsPanel;