from typing import Dict, Any, List
from app.services.sheets_service import SheetsService
from app.utils.logger import logger


class SheetsTool:
    """Tool adapter for Google Sheets integration"""
    
    def __init__(self):
        self.service = SheetsService()
        self.name = "sheets"
        self.description = "Read and write data to Google Sheets"
    
    async def execute(self, action: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Execute Google Sheets actions"""
        try:
            if action == "read_data":
                sheet_id = params.get("sheet_id")
                range_name = params.get("range", "Sheet1!A1:Z1000")
                result = await self.service.read_data(sheet_id, range_name)
                return {"success": True, "data": result}
            
            elif action == "write_data":
                sheet_id = params.get("sheet_id")
                range_name = params.get("range")
                values = params.get("values", [])
                result = await self.service.write_data(sheet_id, range_name, values)
                return {"success": True, "data": result}
            
            elif action == "append_data":
                sheet_id = params.get("sheet_id")
                range_name = params.get("range")
                values = params.get("values", [])
                result = await self.service.append_data(sheet_id, range_name, values)
                return {"success": True, "data": result}
            
            else:
                return {"success": False, "error": f"Unknown action: {action}"}
        
        except Exception as e:
            logger.error(f"SheetsTool error: {str(e)}")
            return {"success": False, "error": str(e)}
