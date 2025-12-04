from fastapi import APIRouter, HTTPException
from app.services.notion_service import NotionService
from app.utils.logger import logger

router = APIRouter(prefix="/notion", tags=["Notion"])
notion_service = NotionService()


@router.post("/create-page")
async def create_page(title: str, content: str):
    try:
        response = await notion_service.create_page(title, content)
        return {"status": "success", "data": response}
    
    except Exception as e:
        logger.error(f"Notion controller Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))