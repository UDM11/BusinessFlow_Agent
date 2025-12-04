import os
from functools import lru_cache
from pydantic import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    SLACK_BOT_TOKEN: str
    NOTION_API_KEY: str
    EMAIL_SERVICE_API_KEY: str
    GOOGLE_SHEETS_CREDENTIALS: str
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"



@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()