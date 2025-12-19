from fastapi import APIRouter, HTTPException
from app.schemas.sheets_schemas import SheetsAppendRequest, SheetsResponse
from typing import Dict, Any
from app.services.sheets_service import SheetsService
from app.utils.logger import logger

router = APIRouter()
sheets_service = SheetsService()

@router.post("/append", response_model=SheetsResponse)
def append_row(request: SheetsAppendRequest):
    try:
        success = sheets_service.append_row(request.row)
        if success:
            return SheetsResponse(status="success", message="Row appended successfully")
        raise Exception("Failed to append row")
    except Exception as e:
        logger.error(f"Sheets controller error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/test")
def test_sheets_connection(request: dict):
    try:
        # Mock test - replace with actual Google Sheets API test
        service_account = request.get("serviceAccount")
        if not service_account:
            return {"success": False, "message": "Service account JSON required"}
        return {"success": True, "message": "Google Sheets connection successful"}
    except Exception as e:
        logger.error(f"Sheets test error: {str(e)}")
        return {"success": False, "message": str(e)}