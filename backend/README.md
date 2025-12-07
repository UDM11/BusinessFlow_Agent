# BusinessFlow Agent Backend

AI-driven workflow orchestration backend for automating business tasks across Slack, Email, Notion, and Google Sheets.

## Features

- **AI Agent**: Intelligent task planning and execution using OpenAI
- **Multi-Platform Integration**: Slack, Email, Notion, Google Sheets
- **Workflow Automation**: Automated task orchestration
- **Background Jobs**: Scheduled tasks and daily summaries
- **RESTful API**: FastAPI-based endpoints

## Setup

1. **Install Dependencies**
```bash
pip install -r requirements.txt
```

2. **Configure Environment**
Copy `.env` and update with your credentials:
- OpenAI API key
- Slack bot token
- Email credentials
- Notion API key
- Google Sheets service account

3. **Run Server**
```bash
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

### Health
- `GET /api/health/` - Health check

### Agent
- `POST /api/agent/run` - Execute agent task

### Slack
- `POST /api/slack/send` - Send Slack message

### Email
- `POST /api/email/send` - Send email

### Notion
- `POST /api/notion/create-page` - Create Notion page

### Sheets
- `POST /api/sheets/append` - Append row to Google Sheets

## Project Structure

```
backend/
├── app/
│   ├── agent/          # AI agent logic
│   ├── controllers/    # API controllers
│   ├── jobs/           # Background jobs
│   ├── middleware/     # Custom middleware
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── schemas/        # Request/response schemas
│   ├── services/       # Business logic
│   ├── tools/          # Integration tools
│   └── utils/          # Utilities
├── config/             # Configuration
└── tests/              # Unit tests
```

## Documentation

API docs available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
