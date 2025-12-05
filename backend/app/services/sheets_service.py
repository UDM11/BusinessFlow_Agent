import gspread
import os
from google.oauth2.service_account import Credentials
from config.sheets_config import SheetsConfig
from app.utils.logger import logger


class SheetsService:
    def __init__(self):
        self.client = None
        self.sheet = None
        self._initialized = False

    def _initialize(self):
        if self._initialized:
            return
        
        try:
            if not os.path.exists(SheetsConfig.service_account_json):
                logger.warning("Google Sheets service account file not found. Service disabled.")
                return
                
            creds = Credentials.from_service_account_file(
                SheetsConfig.service_account_json,
                scopes=["https://www.googleapis.com/auth/spreadsheets"]
            )
            self.client = gspread.authorize(creds)
            self.sheet = self.client.open_by_key(SheetsConfig.sheet_id).sheet1
            logger.info("Google Sheets service initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Google Sheets service: {str(e)}")
        finally:
            self._initialized = True

    def append_row(self, row_data: list) -> bool:
        self._initialize()
        
        if not self.sheet:
            logger.error("Google Sheets service not available")
            return False
            
        try:
            self.sheet.append_row(row_data)
            logger.info("Row appended to Google Sheets")
            return True
        except Exception as e:
            logger.error(f"Sheets Error: {str(e)}")
            return False
