# BusinessFlow Agent Frontend

A production-grade React frontend for the BusinessFlow Agent AI & Workflow Automation Platform.

## Features

- **AI Agents Management** - Create, configure, and run intelligent automation agents
- **Workflow Builder** - Design multi-step automation workflows
- **Job Monitoring** - Track execution history and logs
- **Integrations** - Connect with external services (Slack, Notion, Google Sheets, etc.)
- **System Health** - Monitor performance and system status
- **User Management** - Profile settings and API key management

## Tech Stack

- **React 18** - Modern React with functional components
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Context API** - Global state management
- **Vite** - Fast build tool and dev server

## Project Structure

```
src/
├── app/                 # App entry point and router
├── api/                 # API service layer
├── auth/                # Authentication logic
├── layouts/             # Layout components
├── pages/               # Page components organized by feature
│   ├── public/          # Public pages (landing, login)
│   ├── dashboard/       # Dashboard and overview
│   ├── agents/          # AI agents management
│   ├── workflows/       # Workflow builder and management
│   ├── jobs/            # Job history and monitoring
│   ├── integrations/    # External service integrations
│   ├── system/          # System health and logs
│   └── settings/        # User settings and preferences
├── components/          # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Modal, etc.)
│   ├── navigation/      # Navigation components
│   └── shared/          # Shared business components
├── hooks/               # Custom React hooks
├── context/             # React Context providers
├── utils/               # Utility functions
└── styles/              # Global styles and CSS
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
```

## Authentication

The app uses JWT token-based authentication. Tokens are stored in localStorage and automatically included in API requests via Axios interceptors.

## API Integration

- All API calls go through the centralized `axiosInstance`
- Each domain has its own API service file in `/api`
- Custom hooks in `/hooks` provide easy-to-use interfaces for components
- Proper error handling and loading states throughout

## State Management

- **AuthContext** - User authentication state
- **AgentContext** - AI agents data and operations  
- **WorkflowContext** - Workflow data and operations
- Local component state for UI-specific data

## UI Components

All UI components follow a consistent design system:
- Reusable Button, Modal, Badge, Loader components
- Utility CSS classes for common patterns
- Responsive design with mobile support
- Clean SaaS-style interface

## Development Guidelines

- Use functional components only
- Keep components small and single-purpose
- No business logic in UI components
- Meaningful variable and function names
- Proper error boundaries and loading states
- Follow the established folder structure

## Demo Credentials

For development/demo purposes, any email and password combination will work for login.