import logging
from googleapiclient.discovery import build
from config.sheets_config import get_credentials, SHEET_ID


logger = logging.getLogger(__name__)



class SheetsService:
    def __init__(self, sheet_id = SHEET_ID):
        self.sheet_id = sheet_id
        creds = get_credentials()
        self.service = build('sheets', 'v4', credentials = creds)


    def read_range(self, range_name: str) -> list:
        """
        Read values from a google sheet range.
        """

        try:
            sheet = self.service.spreadsheets()
            result = sheet.values().get(spreadsheetId = self.sheet_id, range = range_name).execute()
            values = result.get('values', [])
            logger.info(f"Read {len(values)} rows from range {range_name}")
            return values
        
        except Exception as e:
            logger.error(f"Error reading sheet range {range_name}: {e}")
            return []
        


    def write_range(self, range_name: str, values: list) -> dict:
        """
        Docstring for write_range
        
        Write values to a google sheetrange.
        """

        try:
            body = {"values": values}
            sheet = self.service.spreadsheets()
            result = sheet.values().update(
                spreadshheetID = self.sheet_id, 
                range = range_name, 
                valueInputOption = "RAW",
                body = body
            ).execute()
            logger.info(f"Wrote {len(values)} rows to range {range_name}")
            return result
        
        except Exception as e:
            logger.error(f"Error writing sheet range {range_name}: {e}")
            return {}