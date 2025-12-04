from fastapi import APIRouter, HTTPException
from app.services.sheets_service import SheetsService
from app.utils.logger import logger


router = APIRouter(prefix="/sheets", tags=["Sheets"])
sheets_service = SheetsService()


@router.post("append")
def append_row(row: list):
    try:
        success = sheets_service.append_row(row)
        if success:
            return {"status": "success", "message": "Row appended successfully"}
        raise Exception("Failed to append row")
    
    except Exception as e:
        logger.error(f"sheets controller Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))