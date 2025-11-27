from fastapi import HTTPException
from app.services.sheets_service import SheetsService

class SheetsController:
    def __init__(self):
        self.sheets_service = SheetsService()
    
    async def read_sheet(self, spreadsheet_id: str, range_name: str):
        try:
            return await self.sheets_service.read_sheet(spreadsheet_id, range_name)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    async def write_sheet(self, spreadsheet_id: str, range_name: str, values: list):
        try:
            return await self.sheets_service.write_sheet(spreadsheet_id, range_name, values)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))