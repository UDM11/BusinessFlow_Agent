from fastapi import APIRouter, HTTPException
from app.schemas.notion_schemas import NotionPageRequest, NotionResponse
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