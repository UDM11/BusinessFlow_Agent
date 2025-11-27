from fastapi import HTTPException
from app.services.email_service import EmailService

class EmailController:
    def __init__(self):
        self.email_service = EmailService()
    
    async def send_email(self, to: str, subject: str, body: str):
        try:
            return await self.email_service.send_email(to, subject, body)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    async def get_emails(self, limit: int = 10):
        try:
            return await self.email_service.get_emails(limit)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))