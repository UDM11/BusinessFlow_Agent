from fastapi import APIRouter, Request, HTTPException
from app.services.slack_service import SlackService
from app.utils.logger import logger

router = APIRouter(prefix="/slack", tags=["Slack"])
slack_service = SlackService()


@router.post("/send")
async def send_slack_message(channel: str, text: str):
    try:
        result = await slack_service.send_message(channel, text)
        return {"status": "success", "data": result}
    
    except Exception as e:
        logger.error(f"slack controller Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))