# BusinessFlow Agent Frontend

A production-ready React frontend for the AI Workflow Orchestrator system.

## Features

- **Authentication**: Token-based auth with protected routes
- **Dashboard**: System health status and recent workflows overview
- **Workflow Creation**: Natural language prompt input for agent instructions
- **Agent Execution**: Real-time visualization of workflow planning and execution
- **Integrations**: Configuration for Slack, Email, Notion, and Google Sheets
- **Logs & History**: Complete workflow execution history with search and export

## Tech Stack

- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API communication
- Lucide React for icons

## Project Structure

```
src/
├── pages/           # Page components
│   ├── auth/        # Login page
│   ├── dashboard/   # Dashboard overview
│   ├── workflows/   # Workflow creation
│   ├── agent/       # Agent execution view
│   ├── integrations/# Integration settings
│   └── logs/        # Execution logs
├── components/      # Reusable components
│   ├── layout/      # Layout components
│   ├── agent/       # Agent-specific components
│   └── ui/          # UI components
├── services/        # API services
├── context/         # React contexts
├── hooks/           # Custom hooks
└── utils/           # Utility functions
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## API Integration

The frontend connects to the FastAPI backend running on port 8000. All API calls are proxied through Vite's dev server.

## Key Components

### Workflow Creation
- Large prompt textarea for natural language instructions
- Example prompts for guidance
- One-click execution with real-time feedback

### Agent Execution View
- Live polling for execution status
- Visual step-by-step progress
- Tool execution status with parameters and results
- Error handling and display

### Integrations Management
- Configuration forms for each service
- Connection testing
- Status indicators

### Logs & History
- Searchable execution history
- Status filtering
- CSV export functionality