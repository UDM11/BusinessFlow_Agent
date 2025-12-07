from typing import Dict, Any
from app.services.slack_service import SlackService
from app.utils.logger import logger


class SlackTool:
    """Tool adapter for Slack integration"""
    
    def __init__(self):
        self.service = SlackService()
        self.name = "slack"
        self.description = "Send messages to Slack channels"
    
    async def execute(self, action: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Execute Slack actions"""
        try:
            if action == "send_message":
                channel = params.get("channel")
                text = params.get("text")
                result = await self.service.send_message(channel, text)
                return {"success": True, "data": result}
            
            elif action == "send_to_default":
                text = params.get("text")
                result = await self.service.send_to_default(text)
                return {"success": True, "data": result}
            
            else:
                return {"success": False, "error": f"Unknown action: {action}"}
        
        except Exception as e:
            logger.error(f"SlackTool error: {str(e)}")
            return {"success": False, "error": str(e)}
