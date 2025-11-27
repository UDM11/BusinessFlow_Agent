import os
from dotenv import load_dotenv

load_dotenv()

class EmailConfig:
    SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    USERNAME = os.getenv("EMAIL_USERNAME")
    PASSWORD = os.getenv("EMAIL_PASSWORD")