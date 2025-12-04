import gspread
from google.oauth2.service_account import Credentials
from config.sheets_config import SheetsConfig
from app.utils.logger import logger


class SheetsService:
    def __init__(self):
        creds = Credentials.from_service_account_file(
            SheetsConfig.service_account_json,
            scopes=["https://www.googleapis.com/auth/spreadsheets"]
        )
        self.client = gspread.authorize(creds)
        self.sheet = self.client.open_by_key(SheetsConfig.sheet_id).sheet1

    def append_row(self, row_data: list) -> bool:
        try:
            self.sheet.append_row(row_data)
            logger.info("Row appended to Google Sheets")
            return True
        except Exception as e:
            logger.error(f"Sheets Error: {str(e)}")
            return False
