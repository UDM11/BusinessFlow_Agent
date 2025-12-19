from fastapi import APIRouter, HTTPException
from app.schemas.notion_schemas import NotionPageRequest, NotionResponse
from typing import Dict, Any
from app.services.notion_service import NotionService
from app.utils.logger import logger

router = APIRouter()
notion_service = NotionService()

@router.post("/create-page", response_model=NotionResponse)
async def create_page(request: NotionPageRequest):
    try:
        response = await notion_service.create_page(request.title, request.content)
        return NotionResponse(status="success", data=response)
    except Exception as e:
        logger.error(f"Notion controller error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/test")
async def test_notion_connection(request: dict):
    try:
        # Mock test - replace with actual Notion API test
        api_key = request.get("api_key")
        if not api_key or not api_key.startswith("secret_"):
            return {"success": False, "message": "Invalid API key format"}
        return {"success": True, "message": "Notion connection successful"}
    except Exception as e:
        logger.error(f"Notion test error: {str(e)}")
        return {"success": False, "message": str(e)}