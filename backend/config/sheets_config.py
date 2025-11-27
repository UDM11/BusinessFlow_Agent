import os
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv

load_dotenv()

class SheetsConfig:
    CREDENTIALS_FILE = os.getenv("GOOGLE_CREDENTIALS_FILE")
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
    CREDENTIALS = None
    
    @classmethod
    def get_credentials(cls):
        if cls.CREDENTIALS_FILE and os.path.exists(cls.CREDENTIALS_FILE):
            return Credentials.from_service_account_file(
                cls.CREDENTIALS_FILE, scopes=cls.SCOPES
            )
        return None