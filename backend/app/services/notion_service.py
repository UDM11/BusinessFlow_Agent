import requests
from config.notion_config import NotionConfig
from app.utils.logger import logger


class NotionService:
    def __init__(self):
        self.api_url = "https://api.notion.com/v1/pages"
        self.headers = {
            "Authorization": f"Bearer {NotionConfig.api_key}",
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        }

    async def create_page(self, title: str, content: str) -> dict:
        payload = {
            "parent": {"database_id": NotionConfig.database_id},
            "properties": {
                "Name": {"title": [{"text": {"content": title}}]}
            },
            "children": [
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {"rich_text": [{"text": {"content": content}}]}
                }
            ]
        }

        try:
            response = requests.post(self.api_url, json=payload, headers=self.headers)
            response.raise_for_status()
            logger.info("Notion page created successfully")
            return response.json()
        except Exception as e:
            logger.error(f"Notion API error: {str(e)}")
            raise
