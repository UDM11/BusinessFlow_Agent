from fastapi import APIRouter, HTTPException
from app.schemas.slack_schemas import SlackMessageRequest, SlackResponse
from app.services.slack_service import SlackService
from app.utils.logger import logger

router = APIRouter()
slack_service = SlackService()


@router.post("/send", response_model=SlackResponse)
async def send_slack_message(request: SlackMessageRequest):
    try:
        result = await slack_service.send_message(request.channel, request.text)
        return SlackResponse(status="success", data=result)
    except Exception as e:
        logger.error(f"Slack controller error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))