from typing import Dict, Any
from app.services.notion_service import NotionService
from app.utils.logger import logger


class NotionTool:
    """Tool adapter for Notion integration"""
    
    def __init__(self):
        self.service = NotionService()
        self.name = "notion"
        self.description = "Create and manage Notion pages"
    
    async def execute(self, action: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Execute Notion actions"""
        try:
            if action == "create_page":
                title = params.get("title")
                content = params.get("content", "")
                result = await self.service.create_page(title, content)
                return {"success": True, "data": result}
            
            else:
                return {"success": False, "error": f"Unknown action: {action}"}
        
        except Exception as e:
            logger.error(f"NotionTool error: {str(e)}")
            return {"success": False, "error": str(e)}
