from googleapiclient.discovery import build
from config.sheets_config import SheetsConfig

class SheetsService:
    def __init__(self):
        credentials = SheetsConfig.get_credentials()
        if credentials:
            self.service = build('sheets', 'v4', credentials=credentials)
        else:
            self.service = None
    
    async def read_sheet(self, spreadsheet_id: str, range_name: str):
        if not self.service:
            raise Exception("Google Sheets service not configured. Please set GOOGLE_CREDENTIALS_FILE.")
        result = self.service.spreadsheets().values().get(
            spreadsheetId=spreadsheet_id,
            range=range_name
        ).execute()
        return result.get('values', [])
    
    async def write_sheet(self, spreadsheet_id: str, range_name: str, values: list):
        if not self.service:
            raise Exception("Google Sheets service not configured. Please set GOOGLE_CREDENTIALS_FILE.")
        body = {'values': values}
        result = self.service.spreadsheets().values().update(
            spreadsheetId=spreadsheet_id,
            range=range_name,
            valueInputOption='RAW',
            body=body
        ).execute()
        return result