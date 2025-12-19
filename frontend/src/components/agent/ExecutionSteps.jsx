import React from 'react';
import { CheckCircle, Clock, XCircle, Circle } from 'lucide-react';

const ExecutionSteps = ({ steps }) => {
  const getStepIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'running': return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'border-green-200 bg-green-50';
      case 'running': return 'border-blue-200 bg-blue-50';
      case 'failed': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Execution Steps</h2>
      
      {steps.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Planning workflow steps...
        </div>
      ) : (
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getStepColor(step.status)}`}
            >
              <div className="flex items-start space-x-3">
                {getStepIcon(step.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      Step {index + 1}: {step.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {step.timestamp && new Date(step.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  
                  {step.details && (
                    <div className="mt-2 text-xs text-gray-500">
                      <pre className="whitespace-pre-wrap">{step.details}</pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExecutionSteps;