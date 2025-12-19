import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agentService } from '../../services/agent.service';
import { Play, Loader } from 'lucide-react';

const Workflows = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleExecute = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const result = await agentService.executeWorkflow(prompt);
      navigate(`/agent/${result.execution_id}`);
    } catch (error) {
      console.error('Failed to execute workflow:', error);
      alert('Failed to start workflow. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const examplePrompts = [
    "Send a summary of yesterday's sales to the manager and add the data in Excel.",
    "Create a Notion page with today's meeting notes and share it on Slack.",
    "Export customer data from Google Sheets and email it to the team.",
    "Update the project status in Notion and notify stakeholders via email."
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Create Workflow</h1>
        <p className="mt-2 text-gray-600">
          Describe what you want the AI agent to do in natural language
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Workflow Instructions
            </label>
            <textarea
              id="prompt"
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 resize-none"
              placeholder="Describe what you want the agent to do... For example: 'Send a summary of yesterday's sales to the manager and add the data in Excel.'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {prompt.length} characters
            </span>
            <button
              onClick={handleExecute}
              disabled={!prompt.trim() || loading}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span>{loading ? 'Starting...' : 'Run Agent'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Example Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examplePrompts.map((example, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-colors"
              onClick={() => setPrompt(example)}
            >
              <p className="text-sm text-gray-700">{example}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflows;