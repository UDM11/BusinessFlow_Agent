import os
from dotenv import load_dotenv

load_dotenv()

class SlackConfig:
    BOT_TOKEN = os.getenv("SLACK_BOT_TOKEN")
    SIGNING_SECRET = os.getenv("SLACK_SIGNING_SECRET")
    APP_TOKEN = os.getenv("SLACK_APP_TOKEN")