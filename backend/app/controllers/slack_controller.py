from fastapi import HTTPException
from app.services.slack_service import SlackService

class SlackController:
    def __init__(self):
        self.slack_service = SlackService()
    
    async def send_message(self, channel: str, message: str):
        try:
            return await self.slack_service.send_message(channel, message)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    async def get_channels(self):
        try:
            return await self.slack_service.get_channels()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))