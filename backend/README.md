# BusinessFlow Agent Backend

A FastAPI-based backend service for automating business workflows across Slack, Email, Notion, and Google Sheets.

## Project Structure

```
backend/
├── app/
│   ├── controllers/          # Request handlers
│   ├── services/            # Business logic & API integrations
│   ├── models/              # Data models
│   ├── utils/               # Helper utilities
│   ├── routes/              # API route definitions
│   └── main.py              # FastAPI application entry point
├── config/                  # Configuration files
├── jobs/                    # Background tasks & scheduling
├── tests/                   # Unit & integration tests
├── requirements.txt         # Python dependencies
├── .env                     # Environment variables
└── README.md               # This file
```

## Setup

1. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   - Copy `.env` file and update with your actual API keys and credentials
   - Set up Slack Bot Token, Notion Token, Google Sheets credentials, etc.

4. **Run the application:**
   ```bash
   python -m uvicorn app.main:app --reload
   ```

## API Endpoints

### Slack
- `POST /api/slack/send-message` - Send message to Slack channel
- `GET /api/slack/channels` - Get list of Slack channels

### Email
- `POST /api/email/send` - Send email
- `GET /api/email/inbox` - Get emails from inbox

### Notion
- `POST /api/notion/create-page` - Create new Notion page
- `GET /api/notion/pages/{database_id}` - Get pages from Notion database

### Google Sheets
- `GET /api/sheets/read/{spreadsheet_id}` - Read data from Google Sheet
- `POST /api/sheets/write/{spreadsheet_id}` - Write data to Google Sheet

## Testing

Run tests with:
```bash
pytest
```

## Configuration

Update the configuration files in the `config/` directory to customize:
- Database connections
- API credentials
- Service settings

## Development

The application follows a clean architecture pattern:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and external API integrations
- **Models**: Define data structures using Pydantic
- **Routes**: Define API endpoints and routing
- **Utils**: Provide helper functions and utilities