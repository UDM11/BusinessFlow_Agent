from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # App
    APP_ENV: str
    APP_DEBUG: bool
    APP_PORT: int
    APP_SECRET_KEY: str

    # DB
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str

    # OpenAI
    OPENAI_API_KEY: str
    OPENAI_MODEL: str
    OPENAI_TIMEOUT: int

    # Slack
    SLACK_BOT_TOKEN: str
    SLACK_SIGNING_SECRET: str
    SLACK_DEFAULT_CHANNEL: str

    # Email
    EMAIL_HOST: str
    EMAIL_PORT: int
    EMAIL_USER: str
    EMAIL_PASSWORD: str
    EMAIL_FROM: str

    # Google Sheets
    GOOGLE_SERVICE_ACCOUNT_JSON: str
    GOOGLE_SHEET_ID: str

    # Notion
    NOTION_API_KEY: str
    NOTION_DATABASE_ID: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"



settings = Settings()