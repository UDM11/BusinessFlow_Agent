from notion_client import AsyncClient
from config.notion_config import NotionConfig

class NotionService:
    def __init__(self):
        self.client = AsyncClient(auth=NotionConfig.TOKEN)
    
    async def create_page(self, database_id: str, properties: dict):
        response = await self.client.pages.create(
            parent={"database_id": database_id},
            properties=properties
        )
        return response
    
    async def get_pages(self, database_id: str):
        response = await self.client.databases.query(database_id=database_id)
        return response["results"]