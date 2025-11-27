import os
from dotenv import load_dotenv

load_dotenv()

class DatabaseConfig:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./businessflow.db")
    ECHO = os.getenv("DB_ECHO", "False").lower() == "true"