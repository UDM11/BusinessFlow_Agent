from fastapi import HTTPException
from app.services.notion_service import NotionService

class NotionController:
    def __init__(self):
        self.notion_service = NotionService()
    
    async def create_page(self, database_id: str, properties: dict):
        try:
            return await self.notion_service.create_page(database_id, properties)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    async def get_pages(self, database_id: str):
        try:
            return await self.notion_service.get_pages(database_id)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))