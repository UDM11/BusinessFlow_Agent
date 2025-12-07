from typing import Dict, Any
from app.services.email_service import EmailService
from app.utils.logger import logger


class EmailTool:
    """Tool adapter for Email integration"""
    
    def __init__(self):
        self.service = EmailService()
        self.name = "email"
        self.description = "Send emails to recipients"
    
    def execute(self, action: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Execute Email actions"""
        try:
            if action == "send_email":
                to = params.get("to")
                subject = params.get("subject")
                message = params.get("message")
                result = self.service.send_email(to, subject, message)
                return {"success": result, "data": {"to": to, "subject": subject}}
            
            else:
                return {"success": False, "error": f"Unknown action: {action}"}
        
        except Exception as e:
            logger.error(f"EmailTool error: {str(e)}")
            return {"success": False, "error": str(e)}
