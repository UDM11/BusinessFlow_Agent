import os
from dotenv import load_dotenv

load_dotenv()

class NotionConfig:
    TOKEN = os.getenv("NOTION_TOKEN")
    DATABASE_ID = os.getenv("NOTION_DATABASE_ID")