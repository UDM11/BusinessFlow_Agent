import logging
from notion_client import Client
from config.notion_config import NOTION_TOKEN, NOTION_DATABASE_ID

logger = logging.getLogger(__name__)

class NotionService:
    def __init__(self, token = NOTION_TOKEN, database_id = NOTION_DATABASE_ID):
        self.client = Client(auth = token)
        self.database_id = database_id


    def create_page(self, title:str, properties: dict = None) -> dict:
        """
        Add a page to the Notion database.
        """

        try:
            page_data = {
                "parent": {"database_id": self.database_id},
                "properties": {
                    "Name": {
                        "title": [{"text": {"content": title}}]
                    }
                }
            }
            if properties:
                page_data["properties"].update(properties)

            response = self.client.page.create(**page_data)
            logger.info(f"Created page '{title}")
            return response
        
        except Exception as e:
            logger.error(f"Notion page creation failed: {e}")
            return []